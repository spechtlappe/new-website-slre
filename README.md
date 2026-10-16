# Nuovo sito SLRE · slre.ch

Prototipo del nuovo sito di Specht & Lappe Real Estate, costruito sulla
"Presentazione nuovo sito slre.ch" e sui "Testi nuovo sito" (rev. 16.10.2026).
Next.js 16 (App Router, Cache Components) + TypeScript, CSS Modules.

## Sviluppo

```bash
npm install
npm run dev
```

Apri http://localhost:3000. `npm run build` esegue anche il type-check.

## Pagine

| Percorso | Contenuto |
| --- | --- |
| `/` | Home: apertura (versione A su desktop, Microlino su mobile), ricerca rapida, immobili, chi siamo, processo, servizi, sedi, Journal, Bellevue, FAQ |
| `/immobili` | Elenco con filtri in una barra e schede Disponibili / In affitto / Venduti; profilo di ricerca off-market |
| `/immobili/[slug]` | Scheda immobile: galleria, dati principali, consulente, planimetrie scaricabili |
| `/chi-siamo` | Storia, team, valori, partner, Galleria Menouno, lavora con noi |
| `/team/[slug]` | Scheda persona |
| `/contatto` | Form a 7 campi con scelta dell'obiettivo |
| `/vendere`, `/acquistare`, `/stime`, `/journal`, `/gestione` | Pagine di servizio (calcolatore ipoteca su Acquistare) |

## Dati e collegamento a Nestermind

- `src/lib/types.ts`: modello dati del sito (`Property`, `TeamMember`, …).
- `src/lib/crm/index.ts`: unico punto d'accesso agli immobili. Oggi legge
  `mock-properties.ts` (**dati di esempio**: foto reali, testi e prezzi inventati).
  Per Nestermind basta un adattatore che implementi `PropertySource` e mappi i
  campi del CRM su `Property`. Le letture sono in cache con il tag `properties`:
  un webhook potrà chiamare `revalidateTag("properties", "max")`.
- `src/lib/data/`: team, sedi, testi fissi, FAQ, link Journal/brochure.

## Foto e materiali

Le foto in `public/images` sono ridimensionate (max 2400 px) dagli originali in
SharePoint › Marketing › 7. Sito internet › SLRE Nuovo sito › 03 Materiali.

## Da completare

- Font testi: il brand usa **Untitled Sans** (Klim, commerciale). Finché la
  licenza web non è confermata si usa Hanken Grotesk (`src/app/fonts.ts`).
- Foto mancanti: Galleria Menouno, Davide Zanchin, Michela Torta.
- Form (contatto, off-market, newsletter): ancora senza invio.
- PDF dei documenti (processo di vendita, listino stime, sportello 24/7).
- Versioni DE / EN; elenco sponsoring 2026; Zurigo nel footer da confermare.
