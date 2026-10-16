"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { contact, nav } from "@/lib/data/site";
import styles from "./MobileMenu.module.css";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Chiudi il menu" : "Apri il menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.bars} data-open={open} />
      </button>

      <div id="mobile-menu" className={styles.panel} data-open={open} hidden={!open}>
        <nav aria-label="Menu mobile" className={styles.nav}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={close} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.footer}>
          <Link href="/contatto" onClick={close} className="btn btn--primary">
            Prenota una consulenza
          </Link>
          <a href={contact.phoneHref} className={styles.meta}>
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className={styles.meta}>
            {contact.email}
          </a>
        </div>
      </div>
    </>
  );
}
