import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
        <span className="eyebrow">Pagina non trovata</span>
        <h1 className="display">
          Questa porta <em>è chiusa.</em>
        </h1>
        <p className="lead">La pagina che cerca non esiste o è stata spostata.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/" className="btn btn--primary">
            Torna alla home
          </Link>
          <Link href="/immobili" className="btn btn--outline">
            Vedi gli immobili
          </Link>
        </div>
      </div>
    </section>
  );
}
