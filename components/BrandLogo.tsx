import Image from "next/image";
import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="ADIS WIGS & Beauty logo"
        width={60}
        height={60}

        className="h-15 w-15 object-contain"
        priority
      />

      <div className="leading-tight">
        <p className="font-serif text-lg tracking-wide">ADIS WiGS</p>
        <p className="text-xs uppercase tracking-[0.4em] text-deep/60">
          AND Beauty
        </p>
      </div>
    </Link>
  );
}
