"use client";
import { useRef, useState, useEffect, useCallback } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface CompassState {
  heading: number | null;
  qiblaDirection: number | null;
  isAligned: boolean;
  accuracy: number | null;
}

type AppState = "idle" | "requesting" | "active" | "error";

const KAABA_LOCATION: Location = { lat: 21.422487, lng: 39.826206 };
const ALIGNMENT_THRESHOLD = 10;

function calculateQiblaDirection(userLat: number, userLng: number): number {
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

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
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
  return typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export default function QiblaFinderPage() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [compass, setCompass] = useState<CompassState>({
    heading: null,
    qiblaDirection: null,
    isAligned: false,
    accuracy: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const intervalRef = useRef<number | null>(null);
  const qiblaDirectionRef = useRef<number | null>(null);
  const currentEventType = useRef<string | null>(null);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    type WebkitDeviceOrientationEvent = DeviceOrientationEvent & {
      webkitCompassHeading?: number;
      webkitCompassAccuracy?: number;
    };
    const webkitEvent = event as WebkitDeviceOrientationEvent;
    let heading: number | null = null;
    let accuracy: number | null = null;

    if (typeof webkitEvent.webkitCompassHeading === "number") {
      heading = webkitEvent.webkitCompassHeading;
      accuracy =
        typeof webkitEvent.webkitCompassAccuracy === "number"
          ? webkitEvent.webkitCompassAccuracy
          : null;
    } else if (typeof event.alpha === "number") {
      heading = event.alpha;
    }

    if (heading !== null && qiblaDirectionRef.current !== null) {
      let angleDiff = Math.abs(qiblaDirectionRef.current - heading);
      if (angleDiff > 180) {
        angleDiff = 360 - angleDiff;
      }

      setCompass((prev) => ({
        ...prev,
        heading,
        accuracy,
        isAligned: angleDiff <= ALIGNMENT_THRESHOLD,
      }));
    }
  }, []);

  const requestPermissions = useCallback(async (): Promise<Location> => {
    if (!navigator.geolocation) {
      throw new Error("Geolocation not supported");
    }

    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      });
    });

    const userLocation: Location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    if (
      isIOS() &&
      "requestPermission" in DeviceOrientationEvent &&
      typeof (
        DeviceOrientationEvent as typeof DeviceOrientationEvent & {
          requestPermission?: () => Promise<string>;
        }
      ).requestPermission === "function"
    ) {
      const permission = await (
        DeviceOrientationEvent as typeof DeviceOrientationEvent & {
          requestPermission: () => Promise<string>;
        }
      ).requestPermission();
      if (permission !== "granted") {
        throw new Error("Device orientation permission denied");
      }
    }

    return userLocation;
  }, []);

  const startCompass = useCallback(async () => {
    try {
      setAppState("requesting");
      setError(null);

      const userLocation = await requestPermissions();
      setLocation(userLocation);

      const qiblaDirection = calculateQiblaDirection(userLocation.lat, userLocation.lng);
      const distanceToKaaba = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        KAABA_LOCATION.lat,
        KAABA_LOCATION.lng,
      );

      setDistance(distanceToKaaba);
      qiblaDirectionRef.current = qiblaDirection;
      setCompass((prev) => ({ ...prev, qiblaDirection }));

      const eventName =
        "deviceorientationabsolute" in window ? "deviceorientationabsolute" : "deviceorientation";
      currentEventType.current = eventName;
      window.addEventListener(eventName, handleOrientation as EventListener);

      setAppState("active");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Permission denied or unavailable";
      setError(message);
      setAppState("error");
    }
  }, [requestPermissions, handleOrientation]);

  const stopCompass = useCallback(() => {
    if (currentEventType.current) {
      window.removeEventListener(currentEventType.current, handleOrientation as EventListener);
      currentEventType.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    qiblaDirectionRef.current = null;
    setAppState("idle");
    setCompass({
      heading: null,
      qiblaDirection: null,
      isAligned: false,
      accuracy: null,
    });
    setLocation(null);
    setDistance(null);
    setError(null);
  }, [handleOrientation]);

  useEffect(() => {
    return () => {
      stopCompass();
    };
  }, [stopCompass]);

  const compassRotation = compass.heading !== null ? -compass.heading : 0;
  const qiblaIndicatorRotation =
    compass.qiblaDirection !== null ? compass.qiblaDirection - (compass.heading || 0) : 0;

  return (
    <div className="container-base min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[var(--background)] via-white to-[var(--blue)]/5 p-4">
      <div className="w-full max-w-sm bg-[var(--surface)] rounded-2xl shadow-lg border border-[var(--blue)]/10 p-6 flex flex-col items-center">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[var(--navy)] mb-2">🕋 Qibla Finder</h1>
          <p className="text-sm text-[var(--muted)]">Find the direction to Mecca</p>
        </div>

        {error && (
          <div className="w-full mb-4 p-3 bg-[var(--red)]/10 border border-[var(--red)]/20 rounded-lg">
            <p className="text-[var(--red)] text-sm text-center">{error}</p>
            <button
              onClick={startCompass}
              className="w-full mt-2 py-1 bg-[var(--red)] text-white rounded text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {location && distance && (
          <div className="w-full mb-4 p-3 bg-[var(--blue)]/10 border border-[var(--blue)]/20 rounded-lg text-center">
            <p className="text-[var(--blue)] text-xs">
              📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
            <p className="text-[var(--muted)] text-xs">🕋 {distance.toFixed(0)} km to Kaaba</p>
          </div>
        )}

        <div className="relative mb-6">
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-[var(--surface)] to-[var(--blue)]/5 border-4 border-[var(--blue)]/20 shadow-inner flex items-center justify-center overflow-hidden">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
              <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-[var(--red)]" />
              <p className="text-[var(--red)] text-xs font-bold mt-1 text-center">N</p>
            </div>

            {compass.qiblaDirection !== null && (
              <div
                className={`absolute w-12 h-12 flex items-center justify-center rounded-full border-2 z-30 transition-all duration-300 ${
                  compass.isAligned
                    ? "bg-[var(--green)] border-[var(--green)]/60 shadow-lg animate-pulse scale-110"
                    : "bg-[var(--blue)] border-[var(--blue)]/60"
                }`}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) translateY(-100px) rotate(${qiblaIndicatorRotation}deg)`,
                  transformOrigin: "50% 100px",
                }}
              >
                <span className="text-white text-xl">🕋</span>
              </div>
            )}

            <div
              className="absolute w-5/6 h-5/6 transition-transform duration-200 ease-out"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='95' fill='none' stroke='%23e2e8f0' stroke-width='1'/%3E%3Cg stroke='%2364748b' stroke-width='0.5'%3E%3Cline x1='100' y1='10' x2='100' y2='20'/%3E%3Cline x1='100' y1='180' x2='100' y2='190'/%3E%3Cline x1='10' y1='100' x2='20' y2='100'/%3E%3Cline x1='180' y1='100' x2='190' y2='100'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                transform: `rotate(${compassRotation}deg)`,
              }}
            />

            {compass.heading !== null && appState === "active" && (
              <div
                className={`absolute w-8 h-8 transition-all duration-300 flex items-center justify-center rounded-full border-2 ${
                  compass.isAligned
                    ? "bg-[var(--green)] border-[var(--green)]/60 shadow-lg animate-pulse"
                    : "bg-[var(--navy)] border-[var(--navy)]/60"
                }`}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) translateY(-100px)`,
                  transformOrigin: "50% 100px",
                }}
              >
                <span className="text-white text-sm">📱</span>
              </div>
            )}

            <div className="absolute w-3 h-3 bg-[var(--navy)] rounded-full z-10" />

            {compass.isAligned && appState === "active" && (
              <div className="absolute inset-0 border-4 border-[var(--green)] rounded-full animate-pulse" />
            )}
          </div>
        </div>

        <div className="text-center mb-6 min-h-[3rem] flex items-center justify-center">
          {appState === "idle" && (
            <p className="text-[var(--muted)] text-sm">Tap the button to find Qibla</p>
          )}
          {appState === "requesting" && (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-[var(--blue)] border-t-transparent rounded-full" />
              <p className="text-[var(--blue)] text-sm">Requesting permissions...</p>
            </div>
          )}
          {appState === "active" && compass.isAligned && (
            <div className="text-center">
              <p className="text-[var(--green)] text-lg font-bold">✅ Facing Qibla!</p>
              <p className="text-[var(--green)] text-xs">Direction to Mecca found</p>
            </div>
          )}
          {appState === "active" && !compass.isAligned && compass.heading !== null && (
            <div className="text-center">
              <p className="text-[var(--blue)] text-base font-medium">🧭 Turn to find Qibla</p>
              <p className="text-[var(--muted)] text-xs mt-1">
                Qibla: {compass.qiblaDirection?.toFixed(0)}° | Device: {compass.heading.toFixed(0)}°
              </p>
              <p className="text-[var(--muted)] text-xs">
                Diff:{" "}
                {compass.qiblaDirection && compass.heading
                  ? Math.abs(compass.qiblaDirection - compass.heading).toFixed(0)
                  : "---"}
                °
              </p>
            </div>
          )}
        </div>

        <div className="w-full">
          {appState === "idle" || appState === "error" ? (
            <button
              onClick={startCompass}
              className="btn-cozy btn-primary w-full py-3 text-base font-semibold"
            >
              Find Qibla
            </button>
          ) : appState === "requesting" ? (
            <button disabled className="btn-cozy w-full py-3 bg-[var(--muted)] text-white">
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Starting...
              </span>
            </button>
          ) : (
            <button
              onClick={stopCompass}
              className="btn-cozy w-full py-3 bg-[var(--red)] text-white font-semibold"
            >
              🛑 Stop
            </button>
          )}
        </div>

        <div className="mt-4 text-center text-xs text-[var(--muted)] leading-relaxed">
          Hold your device flat and turn until the Kaaba symbol turns green.
          {compass.accuracy !== null && appState === "active" && (
            <p className="mt-1">
              Accuracy: {compass.accuracy > 20 ? "Low" : compass.accuracy > 10 ? "Medium" : "High"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
