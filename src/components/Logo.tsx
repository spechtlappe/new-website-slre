import Image from "next/image";
import Link from "next/link";

type Props = {
  variant?: "bordeaux" | "bianco";
  width?: number;
  className?: string;
};

export function Logo({ variant = "bordeaux", width = 132, className }: Props) {
  return (
    <Link href="/" className={className} aria-label="Specht & Lappe Real Estate, pagina iniziale">
      <Image
        src={`/images/brand/logo-${variant}.png`}
        alt="Specht & Lappe Real Estate"
        width={width}
        height={Math.round((width * 316) / 720)}
        preload
      />
    </Link>
  );
}
