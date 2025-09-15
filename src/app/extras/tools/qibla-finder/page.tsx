"use client";
import { useRef, useState, useEffect, useCallback } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface CompassState {
  heading: number | null;
  accuracy: number | null;
  calibrationNeeded: boolean;
}

interface QiblaState {
  direction: number | null;
  distance: number | null;
  isAligned: boolean;
}

type AppState = "idle" | "requesting-permission" | "calibrating" | "active" | "error";

interface DeviceOrientationEventWithWebkit extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
  webkitCompassAccuracy?: number;
}

const KAABA_LOCATION: Location = { lat: 21.422487, lng: 39.826206 };
const ALIGNMENT_THRESHOLD = 15;
const COMPASS_UPDATE_INTERVAL = 100;

function calcQiblaDirection(userLat: number, userLng: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const dLng = toRad(KAABA_LOCATION.lng - userLng);
  const lat1 = toRad(userLat);
  const lat2 = toRad(KAABA_LOCATION.lat);

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  const bearing = toDeg(Math.atan2(y, x));
  return (bearing + 360) % 360;
}

function calcDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
}

function isSecureContext(): boolean {
  if (typeof window === "undefined") return false;
  return window.isSecureContext || window.location.hostname === "localhost";
}

export default function QiblaFinderPage() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [compass, setCompass] = useState<CompassState>({
    heading: null,
    accuracy: null,
    calibrationNeeded: false,
  });
  const [qibla, setQibla] = useState<QiblaState>({
    direction: null,
    distance: null,
    isAligned: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  const compassRef = useRef<HTMLDivElement>(null);
  const lastUpdateRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const updateCompass = useCallback(
    (heading: number, accuracy?: number) => {
      const now = Date.now();
      if (now - lastUpdateRef.current < COMPASS_UPDATE_INTERVAL) return;

      lastUpdateRef.current = now;
      setCompass((prev) => ({
        ...prev,
        heading,
        accuracy: accuracy ?? prev.accuracy,
        calibrationNeeded: accuracy !== undefined && accuracy > 50,
      }));

      if (qibla.direction !== null) {
        let angleDiff = Math.abs(qibla.direction - heading);
        if (angleDiff > 180) {
          angleDiff = 360 - angleDiff;
        }

        setQibla((prev) => ({
          ...prev,
          isAligned: angleDiff <= ALIGNMENT_THRESHOLD,
        }));
      }
    },
    [qibla.direction],
  );

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const webkitEvent = event as DeviceOrientationEventWithWebkit;
      let heading: number | null = null;
      let accuracy: number | undefined;

      if (typeof webkitEvent.webkitCompassHeading === "number") {
        heading = webkitEvent.webkitCompassHeading;
        accuracy = webkitEvent.webkitCompassAccuracy;
      } else if (typeof event.alpha === "number") {
        heading = 360 - event.alpha;
      }

      if (heading !== null) {
        updateCompass(heading, accuracy);
      }
    },
    [updateCompass],
  );

  const requestLocationPermission = useCallback((): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }

      if (!isSecureContext()) {
        reject(new Error("Geolocation requires HTTPS or localhost"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(loc);
        },
        (geoError) => {
          let message = "Location access denied or unavailable";
          switch (geoError.code) {
            case geoError.PERMISSION_DENIED:
              message = "Location permission denied. Please allow location access and try again.";
              break;
            case geoError.POSITION_UNAVAILABLE:
              message =
                "Location information unavailable. Please check your GPS/location services.";
              break;
            case geoError.TIMEOUT:
              message = "Location request timed out. Please try again.";
              break;
          }
          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        },
      );
    });
  }, []);

  const requestOrientationPermission = useCallback(async (): Promise<void> => {
    if (isIOS()) {
      const DeviceOrientationEventConstructor = window.DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };

      if (DeviceOrientationEventConstructor?.requestPermission) {
        const permission = await DeviceOrientationEventConstructor.requestPermission();
        if (permission !== "granted") {
          throw new Error("Device orientation permission denied");
        }
      }
    }

    return new Promise((resolve, reject) => {
      let hasReceived = false;
      const testHandler = () => {
        hasReceived = true;
        window.removeEventListener("deviceorientation", testHandler);
        resolve();
      };

      window.addEventListener("deviceorientation", testHandler);

      setTimeout(() => {
        if (!hasReceived) {
          window.removeEventListener("deviceorientation", testHandler);
          reject(new Error("Device orientation not available or not working"));
        }
      }, 2000);
    });
  }, []);

  const startQiblaFinder = useCallback(async () => {
    try {
      setAppState("requesting-permission");
      setError(null);

      const userLocation = await requestLocationPermission();
      setLocation(userLocation);

      const qiblaDirection = calcQiblaDirection(userLocation.lat, userLocation.lng);
      const distanceToKaaba = calcDistance(
        userLocation.lat,
        userLocation.lng,
        KAABA_LOCATION.lat,
        KAABA_LOCATION.lng,
      );

      setQibla({
        direction: qiblaDirection,
        distance: distanceToKaaba,
        isAligned: false,
      });

      await requestOrientationPermission();

      const eventName =
        "deviceorientationabsolute" in window ? "deviceorientationabsolute" : "deviceorientation";

      window.addEventListener(eventName, handleDeviceOrientation, true);

      setAppState("active");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      setAppState("error");
    }
  }, [requestLocationPermission, requestOrientationPermission, handleDeviceOrientation]);

  const stopQiblaFinder = useCallback(() => {
    window.removeEventListener("deviceorientation", handleDeviceOrientation);
    window.removeEventListener("deviceorientationabsolute", handleDeviceOrientation);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setAppState("idle");
    setCompass({ heading: null, accuracy: null, calibrationNeeded: false });
    setQibla({ direction: null, distance: null, isAligned: false });
    setLocation(null);
    setError(null);
  }, [handleDeviceOrientation]);

  useEffect(() => {
    return () => {
      stopQiblaFinder();
    };
  }, [stopQiblaFinder]);

  const compassRotation = compass.heading !== null ? -compass.heading : 0;

  return (
    <div className="container-base min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 flex flex-col items-center border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            🕋 Qibla Finder
          </h1>
          <p className="text-gray-600 text-sm">
            Find the direction to the Holy Kaaba from your location
          </p>
        </div>

        {error && (
          <div className="w-full mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
              <div className="flex-1">
                <p className="text-red-700 text-sm font-medium mb-2">Error</p>
                <p className="text-red-600 text-xs leading-relaxed">{error}</p>
                <button
                  onClick={startQiblaFinder}
                  className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {location && qibla.distance && (
          <div className="w-full mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="text-center">
              <p className="text-blue-700 text-xs font-medium">
                📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
              <p className="text-blue-600 text-xs mt-1">
                🕋 {qibla.distance.toFixed(0)} km to Kaaba
              </p>
            </div>
          </div>
        )}

        <div className="relative mb-6">
          <div className="relative w-72 h-72 rounded-full shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border-8 border-white/50 overflow-hidden">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
              <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-red-500" />
              <p className="text-red-500 text-xs font-bold mt-1 text-center">N</p>
            </div>

            {qibla.direction !== null && (
              <div
                className={`absolute w-16 h-16 flex items-center justify-center rounded-full border-4 shadow-2xl z-40 transition-all duration-300 ${
                  qibla.isAligned
                    ? "bg-green-600 border-green-400 shadow-green-500/80 animate-pulse scale-125"
                    : "bg-orange-600 border-orange-400 shadow-orange-500/80 animate-bounce"
                }`}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) translateY(-120px) rotate(${qibla.direction}deg)`,
                  transformOrigin: "50% 120px",
                }}
              >
                <span className="text-white text-2xl font-black drop-shadow-lg">🕋</span>
              </div>
            )}

            {qibla.direction !== null && (
              <div
                className={`absolute w-0 h-0 z-35 transition-all duration-300 ${
                  qibla.isAligned ? "animate-pulse" : "animate-bounce"
                }`}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) translateY(-110px) rotate(${qibla.direction}deg)`,
                  transformOrigin: "50% 110px",
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: qibla.isAligned ? "16px solid #10b981" : "16px solid #ea580c",
                }}
              />
            )}

            <div
              ref={compassRef}
              className="absolute w-5/6 h-5/6 transition-transform duration-200 ease-out"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='95' fill='none' stroke='%23e2e8f0' stroke-width='2'/%3E%3Cg stroke='%2364748b' stroke-width='1'%3E%3Cline x1='100' y1='10' x2='100' y2='25'/%3E%3Cline x1='100' y1='175' x2='100' y2='190'/%3E%3Cline x1='10' y1='100' x2='25' y2='100'/%3E%3Cline x1='175' y1='100' x2='190' y2='100'/%3E%3C/g%3E%3Cg stroke='%2394a3b8' stroke-width='0.5'%3E%3Cline x1='150' y1='25' x2='157' y2='18'/%3E%3Cline x1='175' y1='50' x2='182' y2='43'/%3E%3Cline x1='175' y1='150' x2='182' y2='157'/%3E%3Cline x1='150' y1='175' x2='157' y2='182'/%3E%3Cline x1='50' y1='175' x2='43' y2='182'/%3E%3Cline x1='25' y1='150' x2='18' y2='157'/%3E%3Cline x1='25' y1='50' x2='18' y2='43'/%3E%3Cline x1='50' y1='25' x2='43' y2='18'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                transform: `rotate(${compassRotation}deg)`,
              }}
            />

            {compass.heading !== null && appState === "active" && qibla.direction !== null && (
              <>
                <div
                  className={`absolute w-1 transition-all duration-300 ${
                    qibla.isAligned ? "bg-green-500 shadow-lg shadow-green-500/50" : "bg-blue-500"
                  }`}
                  style={{
                    height: "120px",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -100%) rotate(${compass.heading - qibla.direction}deg)`,
                    transformOrigin: "50% 100%",
                  }}
                />

                <div
                  className={`absolute w-10 h-10 transition-all duration-300 flex items-center justify-center rounded-full border-2 ${
                    qibla.isAligned
                      ? "bg-green-500 border-green-300 shadow-lg shadow-green-500/50 animate-pulse"
                      : "bg-blue-500 border-blue-300 shadow-md"
                  }`}
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) translateY(-120px) rotate(${compass.heading - qibla.direction}deg)`,
                    transformOrigin: "50% 120px",
                  }}
                >
                  <span className="text-white text-xl font-bold">📱</span>
                </div>
              </>
            )}

            <div className="absolute w-4 h-4 bg-slate-600 rounded-full shadow-md z-10" />

            {qibla.isAligned && appState === "active" && (
              <div className="absolute inset-0 border-4 border-green-400 rounded-full animate-pulse" />
            )}
          </div>

          {compass.calibrationNeeded &&
            compass.accuracy &&
            compass.accuracy > 50 &&
            appState === "active" && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-1">
                <p className="text-yellow-700 text-xs font-medium">
                  📱 Wave phone in figure-8 to calibrate (accuracy: {compass.accuracy?.toFixed(0)}°)
                </p>
              </div>
            )}
        </div>

        <div className="text-center mb-6 min-h-[3rem] flex items-center justify-center">
          {appState === "idle" && (
            <p className="text-gray-600 text-sm">Press the button below to start finding Qibla</p>
          )}
          {appState === "requesting-permission" && (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
              <p className="text-blue-600 text-sm font-medium">Requesting permissions...</p>
            </div>
          )}
          {appState === "active" && qibla.isAligned && (
            <div className="text-center">
              <p className="text-green-600 text-lg font-bold">✅ Qibla Found!</p>
              <p className="text-green-600 text-xs">You are facing the Kaaba</p>
            </div>
          )}
          {appState === "active" && !qibla.isAligned && compass.heading !== null && (
            <div className="text-center">
              <p className="text-orange-600 text-lg font-bold animate-pulse">
                🚨 TURN YOUR BODY TO FIND THE BOUNCING ORANGE KAABA! 🕋
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Qibla: {qibla.direction?.toFixed(0)}° | Your heading: {compass.heading.toFixed(0)}°
                | Diff:{" "}
                {(() => {
                  const diff = Math.abs(qibla.direction! - compass.heading);
                  return Math.min(diff, 360 - diff).toFixed(0);
                })()}
                °
              </p>
            </div>
          )}
        </div>

        <div className="w-full space-y-3">
          {appState === "idle" || appState === "error" ? (
            <button
              onClick={startQiblaFinder}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              🕋 Find Qibla
            </button>
          ) : appState === "requesting-permission" ? (
            <button
              disabled
              className="w-full py-4 bg-gray-400 text-white font-bold rounded-xl shadow-lg cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Starting...
              </span>
            </button>
          ) : (
            <button
              onClick={stopQiblaFinder}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              🛑 Stop
            </button>
          )}
        </div>

        <div className="mt-6 text-center space-y-2">
          <div className="text-xs text-gray-500 max-w-sm leading-relaxed">
            <p className="font-semibold mb-2">📖 How to use:</p>
            <ul className="text-left space-y-1">
              <li>• Allow location and motion permissions</li>
              <li>• Hold phone flat in front of you</li>
              <li>• The orange Kaaba 🕋 shows Qibla direction</li>
              <li>• Turn until blue phone 📱 aligns with orange Kaaba</li>
              <li>• When both turn green, you&rsquo;re facing Mecca!</li>
            </ul>
          </div>

          {compass.accuracy !== null && appState === "active" && (
            <p className="text-xs text-gray-400">
              Compass accuracy:{" "}
              {compass.accuracy > 15 ? "Low" : compass.accuracy > 5 ? "Medium" : "High"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
