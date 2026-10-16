import type { Property } from "@/lib/types";

const chf = new Intl.NumberFormat("de-CH", { maximumFractionDigits: 0 });

/** Formato svizzero: CHF 1’890’000. */
export function formatPrice(property: Pick<Property, "price" | "transaction" | "status">) {
  if (property.status === "venduto") return "Venduto";
  if (property.price === null) return "Prezzo su richiesta";
  const amount = `CHF ${chf.format(property.price).replace(/’|'/g, "’")}`;
  return property.transaction === "affitto" ? `${amount} / mese` : amount;
}

export function formatRooms(rooms: number) {
  return `${String(rooms).replace(".", ",")} locali`;
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}
