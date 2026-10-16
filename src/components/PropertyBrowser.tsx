"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";
import styles from "./PropertyBrowser.module.css";

const tabs = [
  { id: "vendita", label: "Disponibili" },
  { id: "affitto", label: "In affitto" },
  { id: "venduti", label: "Venduti" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const tabIntro: Record<TabId, string | null> = {
  vendita: null,
  affitto:
    "Amministriamo diversi stabili a reddito di nostra proprietà in tutto il Ticino. Qui trova gli appartamenti liberi in questo momento.",
  venduti:
    "Alcune delle case che abbiamo venduto. Molte sono arrivate a noi grazie a chi aveva già venduto con noi.",
};

function inTab(p: Property, tab: TabId) {
  if (tab === "venduti") return p.status === "venduto";
  return p.transaction === tab && p.status !== "venduto";
}

/** Elenco immobili con schede e filtri. Lo stato vive nell'URL. */
export function PropertyBrowser({ properties }: { properties: Property[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const rawTab = params.get("tipo");
  const tab: TabId = tabs.some((t) => t.id === rawTab) ? (rawTab as TabId) : "vendita";
  const town = params.get("localita") ?? "";
  const type = params.get("tipologia") ?? "";
  const rooms = Number(params.get("locali") ?? 0);
  const maxPrice = Number(params.get("prezzo") ?? 0);

  const update = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const inCurrentTab = properties.filter((p) => inTab(p, tab));
  const towns = [...new Set(inCurrentTab.map((p) => p.location.town))].sort();
  const types = [...new Set(inCurrentTab.map((p) => p.type))].sort();

  const results = inCurrentTab.filter(
    (p) =>
      (!town || p.location.town === town) &&
      (!type || p.type === type) &&
      (!rooms || p.rooms >= rooms) &&
      (!maxPrice || tab === "venduti" || (p.price !== null && p.price <= maxPrice)),
  );

  const priceOptions =
    tab === "affitto"
      ? [
          { v: "2000", l: "Fino a CHF 2’000" },
          { v: "3000", l: "Fino a CHF 3’000" },
          { v: "5000", l: "Fino a CHF 5’000" },
        ]
      : [
          { v: "1000000", l: "Fino a CHF 1 Mio" },
          { v: "2000000", l: "Fino a CHF 2 Mio" },
          { v: "3000000", l: "Fino a CHF 3 Mio" },
        ];

  return (
    <div>
      <div className={styles.filters} role="search">
        <Filter label="Località" value={town} onChange={(v) => update({ localita: v })}>
          <option value="">Tutto il Ticino</option>
          {towns.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Filter>
        <Filter label="Tipologia" value={type} onChange={(v) => update({ tipologia: v })}>
          <option value="">Casa, appartamento, rustico…</option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Filter>
        <Filter label="Locali" value={rooms ? String(rooms) : ""} onChange={(v) => update({ locali: v })}>
          <option value="">Tutti</option>
          {[2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              Da {n}
            </option>
          ))}
        </Filter>
        <Filter
          label="Prezzo"
          value={maxPrice ? String(maxPrice) : ""}
          onChange={(v) => update({ prezzo: v })}
          disabled={tab === "venduti"}
        >
          <option value="">Qualsiasi</option>
          {priceOptions.map((o) => (
            <option key={o.v} value={o.v}>
              {o.l}
            </option>
          ))}
        </Filter>
        <button
          type="button"
          className={`btn btn--outline btn--sm ${styles.reset}`}
          onClick={() => update({ localita: "", tipologia: "", locali: "", prezzo: "" })}
        >
          Azzera
        </button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label="Tipo di offerta">
          {tabs.map((t) => {
            const count = properties.filter((p) => inTab(p, t.id)).length;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                className="pill"
                aria-selected={tab === t.id}
                onClick={() => update({ tipo: t.id === "vendita" ? "" : t.id, prezzo: "" })}
              >
                {t.label} · {count}
              </button>
            );
          })}
        </div>
        <span className={styles.count} aria-live="polite">
          {results.length} {results.length === 1 ? "immobile" : "immobili"}
        </span>
      </div>

      {tabIntro[tab] && <p className={styles.intro}>{tabIntro[tab]}</p>}

      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>
            Al momento non abbiamo case con questi criteri. Ci lasci il suo profilo di ricerca: le
            scriviamo noi quando arriva quella giusta.
          </p>
          <Link href="#off-market" className="btn btn--primary btn--sm">
            Crei un profilo di ricerca
          </Link>
        </div>
      )}
    </div>
  );
}

function Filter({
  label,
  value,
  onChange,
  disabled,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const id = `filter-${label.toLowerCase()}`;
  return (
    <div className={styles.filter}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}
        className={styles.select}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </div>
  );
}
