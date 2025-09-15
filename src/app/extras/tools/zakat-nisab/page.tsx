"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COUNTRIES, COUNTRY_TO_CURRENCY } from "@/lib/countryCurrency";

type NisabResponse = {
  code: number;
  status: "success" | "error";
  calculation_standard?: "classical" | "common";
  currency?: string;
  weight_unit?: "gram" | "ounce" | string;
  updated_at?: string;
  data?: {
    nisab_thresholds: {
      gold: { weight: number; unit_price: number; nisab_amount: number };
      silver: { weight: number; unit_price: number; nisab_amount: number };
    };
    zakat_rate: string;
    notes?: string;
  };
  message?: string;
};

export default function ZakatNasibPage() {
  const [standard, setStandard] = useState<"classical" | "common">("classical");
  const [unit, setUnit] = useState<"g" | "oz">("g");
  const [country, setCountry] = useState<string>("CAN");
  const [currency, setCurrency] = useState<string>("cad");
  const [data, setData] = useState<NisabResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const controllerRef = useRef<AbortController | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (controllerRef.current) controllerRef.current.abort();
    const ctrl = new AbortController();
    controllerRef.current = ctrl;
    try {
      const res = await fetch(
        `/api/zakat-nisab?standard=${standard}&currency=${currency}&unit=${unit}`,
        { signal: ctrl.signal },
      );
      const json: NisabResponse = await res.json();
      if (!res.ok || json.status === "error") {
        throw new Error(json.message || "Failed to load");
      }
      setData(json);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(e instanceof Error ? e.message : "Unable to fetch zakat nisab values");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [standard, unit, currency]);

  useEffect(() => {
    fetchData();
  }, [standard, unit, currency, fetchData]);

  useEffect(() => {
    const mapped = COUNTRY_TO_CURRENCY[country];
    if (mapped) setCurrency(mapped);
  }, [country]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatCurrency = (value?: number) => {
    if (value == null || Number.isNaN(value)) return "—";
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currency.toUpperCase(),
        maximumFractionDigits: 2,
      }).format(value);
    } catch {
      return `${value.toFixed(2)} ${currency.toUpperCase()}`;
    }
  };

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedCountry = COUNTRIES.find((c) => c.code === country);
  const goldAmount = data?.data?.nisab_thresholds.gold.nisab_amount ?? 0;
  const silverAmount = data?.data?.nisab_thresholds.silver.nisab_amount ?? 0;
  const totalAmount = goldAmount + silverAmount;
  const weightLabel = data?.weight_unit || (unit === "g" ? "gram" : "ounce");

  return (
    <main className="container-base py-10 flex items-center justify-center">
      <section className="w-full max-w-3xl card p-6 md:p-8 animate-fade-in">
        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: "var(--navy)" }}>
            Zakat Nisab
          </h1>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
            Simple way to view Zakat Nisab
            </p>
        </header>

        <div className="card p-6 mb-6" style={{ background: "var(--surface)" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="relative" ref={dropdownRef}>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--navy)" }}>
                Country
              </label>
              <button
                type="button"
                className="w-full btn-outline px-3 py-2 rounded-md flex items-center justify-between text-left"
                onClick={() => setCountryOpen(!countryOpen)}
              >
                <span>{selectedCountry?.name || "Select country"}</span>
              </button>
              {countryOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 card p-2 max-h-60 overflow-auto"
                  style={{ background: "var(--surface)", zIndex: 50 }}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full btn-outline px-3 py-2 rounded-md mb-2 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                  />
                  {filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      className="w-full text-left px-3 py-2 rounded hover:bg-slate-50"
                      onClick={() => {
                        setCountry(c.code);
                        setCountryOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--navy)" }}>
                Standard
              </label>
              <select
                className="w-full btn-outline px-3 py-2 rounded-md"
                value={standard}
                onChange={(e) => setStandard(e.target.value as "classical" | "common")}
              >
                <option value="classical">Classical</option>
                <option value="common">Common</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--navy)" }}>
                Currency
              </label>
              <input
                type="text"
                className="w-full btn-outline px-3 py-2 rounded-md bg-gray-50"
                value={currency.toUpperCase()}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--navy)" }}>
                Unit
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`btn-cozy px-4 py-2 rounded-md flex-1 ${
                    unit === "g" ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => setUnit("g")}
                >
                  g
                </button>
                <button
                  type="button"
                  className={`btn-cozy px-4 py-2 rounded-md flex-1 ${
                    unit === "oz" ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => setUnit("oz")}
                >
                  oz
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <article className="p-4 card">
            <h2 className="font-semibold mb-3" style={{ color: "var(--navy)" }}>
              Gold Nisab
            </h2>
            <div className="space-y-1 text-sm text-slate-600 mb-3">
              <div>
                Weight: {data?.data?.nisab_thresholds.gold.weight ?? "—"} {weightLabel}
              </div>
              <div>Unit price: {formatCurrency(data?.data?.nisab_thresholds.gold.unit_price)}</div>
            </div>
            <div className="text-xl font-bold" style={{ color: "var(--blue)" }}>
              {formatCurrency(goldAmount)}
            </div>
          </article>

          <article className="p-4 card">
            <h2 className="font-semibold mb-3" style={{ color: "var(--navy)" }}>
              Silver Nisab
            </h2>
            <div className="space-y-1 text-sm text-slate-600 mb-3">
              <div>
                Weight: {data?.data?.nisab_thresholds.silver.weight ?? "—"} {weightLabel}
              </div>
              <div>
                Unit price: {formatCurrency(data?.data?.nisab_thresholds.silver.unit_price)}
              </div>
            </div>
            <div className="text-xl font-bold" style={{ color: "var(--blue)" }}>
              {formatCurrency(silverAmount)}
            </div>
          </article>
        </div>

        <div className="card p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: "var(--blue)" }}>
            Total: {formatCurrency(totalAmount)}
          </div>
        </div>

        {loading && (
          <div className="mt-4 text-center text-sm" style={{ color: "var(--navy)" }}>
            Loading...
          </div>
        )}
        {error && (
          <div className="mt-4 text-center text-sm" style={{ color: "var(--red)" }}>
            {error}
          </div>
        )}
      </section>
    </main>
  );
}
