"use client";
import { useState, useRef, useCallback, useEffect } from "react";

type AppState = "idle" | "locating" | "fetching" | "ready" | "error";

interface AbsoluteOrientationSensor {
  quaternion?: number[];
  onreading?: () => void;
  onerror?: (event: Event) => void;
  start(): void;
  stop(): void;
}

interface WindowWithSensors extends Window {
  AbsoluteOrientationSensor?: new (options?: { frequency?: number }) => AbsoluteOrientationSensor;
  absoluteOrientationSensor?: new (options?: { frequency?: number }) => AbsoluteOrientationSensor;
}

interface DeviceOrientationEventWithWebkit extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

interface DeviceOrientationEventClass {
  requestPermission?: () => Promise<string>;
}

export default function QiblaFinderPage() {
  const [state, setState] = useState<AppState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [qibla, setQibla] = useState<number | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [displayHeading, setDisplayHeading] = useState<number | null>(null);
  const [relative, setRelative] = useState<number | null>(null);

  const unwrappedRef = useRef<number | null>(null);
  const smoothedRef = useRef<number | null>(null);
  const continuousRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const lastCompassFaceDegRef = useRef<number | null>(null);
  const sensorActiveRef = useRef(false);
  const absSensorRef = useRef<AbsoluteOrientationSensor | null>(null);
  const headingWindowRef = useRef<number[]>([]);

  const BASE_SMOOTH = 0.15;

  const normalize = (d: number) => ((d % 360) + 360) % 360;
  const applyOffset = useCallback((d: number) => normalize(d + offsetRef.current), []);

  const updateRelative = useCallback((heading: number, q: number | null) => {
    if (q == null) {
      setRelative(null);
      return;
    }
    setRelative(normalize(q - heading));
  }, []);

  const medianCircular = (values: number[]) => {
    if (!values.length) return 0;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const adjustWrap = max - min > 180;
    const adjusted = adjustWrap ? values.map((v) => (v < 180 ? v + 360 : v)) : values.slice();
    adjusted.sort((a, b) => a - b);
    const m = adjusted[Math.floor(adjusted.length / 2)];
    return adjustWrap ? m % 360 : m;
  };

  const processHeading = useCallback(
    (raw: number) => {
      const rawNorm = normalize(raw);
      const win = headingWindowRef.current;
      win.push(rawNorm);
      if (win.length > 5) win.shift();
      if (win.length < 3) {
        setDisplayHeading(applyOffset(rawNorm));
        updateRelative(applyOffset(rawNorm), qibla);
        return;
      }
      const med = medianCircular(win);
      const final = applyOffset(med);
      if (unwrappedRef.current == null) {
        unwrappedRef.current = final;
        smoothedRef.current = final;
        continuousRef.current = final;
      } else {
        const delta = final - (unwrappedRef.current % 360);
        const wrappedDelta = delta > 180 ? delta - 360 : delta < -180 ? delta + 360 : delta;
        unwrappedRef.current += wrappedDelta;
        if (smoothedRef.current == null) smoothedRef.current = unwrappedRef.current;
        else {
          const k = BASE_SMOOTH;
          smoothedRef.current =
            smoothedRef.current! + k * (unwrappedRef.current - smoothedRef.current!);
        }
        continuousRef.current = smoothedRef.current!;
        if (Math.abs(continuousRef.current) > 1440) {
          const adjust = Math.floor(continuousRef.current / 360) * 360;
          continuousRef.current -= adjust;
          unwrappedRef.current -= adjust;
          smoothedRef.current! -= adjust;
        }
      }
      const disp = normalize(smoothedRef.current!);
      setDisplayHeading(disp);
      updateRelative(disp, qibla);
    },
    [qibla, updateRelative, applyOffset],
  );

  const handleOrientation = useCallback(
    (e: DeviceOrientationEvent) => {
      if (sensorActiveRef.current) return;
      let h: number | null = null;
      const we = e as DeviceOrientationEventWithWebkit;
      if (typeof we.webkitCompassHeading === "number") h = we.webkitCompassHeading;
      else if (typeof e.alpha === "number") {
        const screenAngle =
          screen.orientation && typeof screen.orientation.angle === "number"
            ? screen.orientation.angle
            : typeof (window as WindowWithSensors).orientation === "number"
              ? (window as WindowWithSensors).orientation!
              : 0;
        h = 360 - e.alpha - screenAngle;
      }
      if (h == null) return;
      processHeading(h);
    },
    [processHeading],
  );

  useEffect(() => {
    if (state !== "ready") return;
    let started = false;
    const W = window as WindowWithSensors;
    const SensorCtor = W.AbsoluteOrientationSensor || W.absoluteOrientationSensor;
    if (SensorCtor) {
      try {
        const sensor = new SensorCtor({ frequency: 60 });
        absSensorRef.current = sensor;
        sensor.onreading = () => {
          if (!sensor.quaternion) return;
          const [qx, qy, qz, qw] = sensor.quaternion;
          const ys = 2 * (qw * qz + qx * qy);
          const yc = 1 - 2 * (qy * qy + qz * qz);
          let yaw = (Math.atan2(ys, yc) * 180) / Math.PI;
          yaw = (360 - yaw) % 360;
          sensorActiveRef.current = true;
          processHeading(yaw);
        };
        sensor.onerror = () => {
          try {
            sensor.stop();
          } catch {}
          sensorActiveRef.current = false;
        };
        sensor.start();
        started = true;
        setTimeout(() => {
          if (!sensorActiveRef.current) {
            try {
              sensor.stop();
            } catch {}
          }
        }, 1200);
      } catch {
        // ignore
      }
    }
    return () => {
      if (started && absSensorRef.current) {
        try {
          absSensorRef.current.stop();
        } catch {}
        absSensorRef.current = null;
      }
      sensorActiveRef.current = false;
    };
  }, [state, processHeading]);

  useEffect(() => {
    if (state !== "ready") return;
    window.addEventListener("deviceorientation", handleOrientation as EventListener);
    window.addEventListener("deviceorientationabsolute", handleOrientation as EventListener);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation as EventListener);
      window.removeEventListener("deviceorientationabsolute", handleOrientation as EventListener);
    };
  }, [state, handleOrientation]);

  useEffect(() => {
    const resetOnRotate = () => {
      unwrappedRef.current = null;
      smoothedRef.current = null;
      continuousRef.current = 0;
      headingWindowRef.current = [];
    };
    window.addEventListener("orientationchange", resetOnRotate);
    return () => window.removeEventListener("orientationchange", resetOnRotate);
  }, []);

  const requestOrientationPermission = async () => {
    const DOE = globalThis.DeviceOrientationEvent as DeviceOrientationEventClass | undefined;
    if (DOE && typeof DOE.requestPermission === "function") {
      try {
        const r = await DOE.requestPermission();
        if (r !== "granted") throw new Error("denied");
      } catch {}
    }
  };

  const start = useCallback(async () => {
    try {
      setState("locating");
      setError(null);
      setQibla(null);
      setDisplayHeading(null);
      setRelative(null);
      await requestOrientationPermission();
      if (!navigator.geolocation) throw new Error("No geolocation");
      const pos = await new Promise<GeolocationPosition>((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, {
          enableHighAccuracy: true,
          timeout: 15000,
        }),
      );
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setCoords({ lat, lng });
      setState("fetching");
      const r = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lng}`);
      if (!r.ok) throw new Error("API " + r.status);
      const j = await r.json();
      if (j.code !== 200 || !j.data?.direction) throw new Error("Bad API");
      setQibla(j.data.direction);
      unwrappedRef.current = null;
      smoothedRef.current = null;
      continuousRef.current = 0;
      lastCompassFaceDegRef.current = null;
      headingWindowRef.current = [];
      setState("ready");
    } catch (e) {
      const error = e as Error;
      setError(error.message || "Failed");
      setState("error");
    }
  }, []);

  const refresh = () => start();

  const setNorth = () => {
    if (displayHeading == null) return;
    offsetRef.current = (360 - displayHeading) % 360;
    unwrappedRef.current = null;
    smoothedRef.current = null;
    continuousRef.current = 0;
    headingWindowRef.current = [];
    if (sensorActiveRef.current && absSensorRef.current?.quaternion) {
      const [qx, qy, qz, qw] = absSensorRef.current.quaternion as number[];
      const ys = 2 * (qw * qz + qx * qy);
      const yc = 1 - 2 * (qy * qy + qz * qz);
      let yaw = (Math.atan2(ys, yc) * 180) / Math.PI;
      yaw = (360 - yaw) % 360;
      processHeading(yaw);
    }
  };
  const resetCal = () => {
    offsetRef.current = 0;
    unwrappedRef.current = null;
    smoothedRef.current = null;
    continuousRef.current = 0;
    headingWindowRef.current = [];
  };

  const relForRender = relative == null ? null : relative;
  const compassFaceRotation = continuousRef.current;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-sm bg-white border border-[var(--blue)] rounded-3xl shadow-sm p-6 flex flex-col items-center">
        <h1 className="text-2xl font-light tracking-wide mb-1 text-[var(--navy)]">Qibla Finder</h1>
        <div className="w-72 h-72 relative mb-6 select-none">
          <Compass rotation={compassFaceRotation} relativeDirection={relForRender} />
          {state === "idle" && <Overlay msg="" />}
          {state === "locating" && <Overlay msg="Locating" spinner />}
          {state === "fetching" && <Overlay msg="Getting" spinner />}
          {state === "error" && <Overlay msg={error || "Error"} />}
        </div>
        {qibla != null && (
          <div className="mb-4 text-center text-[11px] text-[var(--navy)]">
            <p className="font-mono text-[var(--blue)]">Qibla {qibla.toFixed(2)}°</p>
            {displayHeading != null && (
              <p className="mt-1 font-mono text-[var(--blue)]">
                Device {displayHeading.toFixed(1)}°
              </p>
            )}
            {coords && (
              <p className="mt-1 text-[var(--navy)]">
                {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
              </p>
            )}
            {relForRender != null && (
              <p className="mt-1 text-[var(--blue)]">Rotate until line hits top</p>
            )}
            <div className="mt-2 flex gap-2 justify-center">
              <button
                onClick={resetCal}
                className="px-2 py-1 bg-[var(--blue)]/10 rounded text-[10px] text-[var(--navy)]"
              >
                Reset
              </button>
              <button
                onClick={setNorth}
                className="px-2 py-1 bg-[var(--blue)]/10 rounded text-[10px] text-[var(--navy)]"
              >
                Set North
              </button>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col gap-3">
          {(state === "idle" || state === "error") && (
            <button
              onClick={start}
              className="w-full py-3 bg-[var(--blue)] text-white rounded-xl text-sm font-medium hover:bg-[var(--navy)] active:scale-[.98] transition"
            >
              Start
            </button>
          )}
          {(state === "locating" || state === "fetching") && (
            <button
              disabled
              className="w-full py-3 bg-[var(--blue)]/20 text-[var(--navy)] rounded-xl text-sm font-medium"
            >
              Working...
            </button>
          )}
          {state === "ready" && (
            <button
              onClick={refresh}
              className="w-full py-3 bg-[var(--navy)] text-white rounded-xl text-sm font-medium hover:bg-[var(--blue)] active:scale-[.98] transition"
            >
              Refresh
            </button>
          )}
        </div>
        <p className="mt-6 text-[10px] text-[var(--blue)] text-center leading-relaxed">
          Calibrate if the direction seems off or inaccurate.
        </p>
      </div>
    </div>
  );
}

function Compass({
  rotation,
  relativeDirection,
}: {
  rotation: number;
  relativeDirection: number | null;
}) {
  const within = relativeDirection != null && (relativeDirection < 5 || relativeDirection > 355);
  const relDisplay =
    within && relativeDirection != null
      ? relativeDirection > 355
        ? (relativeDirection - 360).toFixed(1)
        : relativeDirection.toFixed(1)
      : null;
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 200 200" className="w-full h-full text-gray-700">
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "100px 100px",
            transition: "transform 0.12s linear",
          }}
        >
          <circle cx="100" cy="100" r="98" className="stroke-gray-300 fill-white" strokeWidth={2} />
          {[0, 90, 180, 270].map((a) => (
            <line
              key={a}
              x1="100"
              y1="14"
              x2="100"
              y2="32"
              stroke="#555"
              strokeWidth={3}
              transform={`rotate(${a} 100 100)`}
            />
          ))}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = i * 10;
            if (a % 90 === 0) return null;
            return (
              <line
                key={a}
                x1="100"
                y1="18"
                x2="100"
                y2="30"
                stroke="#999"
                strokeWidth={1.1}
                transform={`rotate(${a} 100 100)`}
              />
            );
          })}
          <CompassLabel a={0} t="N" />
          <CompassLabel a={90} t="E" />
          <CompassLabel a={180} t="S" />
          <CompassLabel a={270} t="W" />
        </g>
        {relativeDirection != null && (
          <g>
            <g
              style={{ transition: "transform 0.18s ease-out" }}
              transform={`rotate(${relativeDirection} 100 100)`}
            >
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="26"
                stroke={within ? "#16a34a" : "#0d6efd"}
                strokeWidth={7}
                strokeLinecap="round"
              />
              <circle cx="100" cy="26" r="6" fill={within ? "#16a34a" : "#0d6efd"} />
            </g>
            <circle cx="100" cy="100" r="4" fill={within ? "#16a34a" : "#0d6efd"} />
            <path d="M100 18 L108 34 L92 34 Z" fill="#16a34a" opacity={0.15} />
            <path d="M100 18 A82 82 0 0 1 100 18" stroke="#16a34a" strokeWidth={0} />
            <g opacity={0.18} stroke="#16a34a" strokeWidth={10} strokeLinecap="round">
              <path d="M100 30 L100 22" />
            </g>
            <g
              opacity={0.1}
              stroke="#16a34a"
              strokeWidth={18}
              strokeLinecap="round"
              transform="rotate(4 100 100)"
            >
              <path d="M100 30 L100 18" />
            </g>
            <g
              opacity={0.1}
              stroke="#16a34a"
              strokeWidth={18}
              strokeLinecap="round"
              transform="rotate(-4 100 100)"
            >
              <path d="M100 30 L100 18" />
            </g>
          </g>
        )}
      </svg>
      {within && relDisplay && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] px-2 py-1 rounded-full shadow">
          {relDisplay}°
        </div>
      )}
    </div>
  );
}

function CompassLabel({ a, t }: { a: number; t: string }) {
  const r = 46;
  const rad = ((a - 90) * Math.PI) / 180;
  const cx = 100 + r * Math.cos(rad);
  const cy = 100 + r * Math.sin(rad);
  return (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={14}
      className="fill-gray-700 font-medium"
    >
      {t}
    </text>
  );
}

function Overlay({ msg, spinner }: { msg: string; spinner?: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[1px] rounded-full bg-white/70 text-gray-600 text-sm">
      {spinner && (
        <div className="mb-2 w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      )}
      <span>{msg}</span>
    </div>
  );
}
