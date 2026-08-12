import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#8C8C8C] mb-4">
          404
        </p>
        <h1 className="text-[clamp(40px,5vw,72px)] font-black mb-6">
          Page introuvable
        </h1>
        <p className="text-base leading-relaxed text-[#D4D4D4] mb-10">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retournez à la page d&apos;accueil pour retrouver les travaux et les
          services.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#0C0C0C] hover:bg-[#e5e5e5] transition-colors duration-200"
        >
          Revenir à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
