import { linkSync } from "fs";
import Link from "next/link";
import { ca } from "zod/locales";

interface CategoryNavProps {
  activeCategory:
    | "people"
    | "starships"
    | "vehicles"
    | "planets"
    | "films"
    | "species";
}

export function CategoryNav({ activeCategory }: CategoryNavProps) {
  const categories = [
    { id: "people", label: "People", href: "/people" },
    { id: "starship", label: "Starship", href: "/starship" },
    { id: "vehicles", label: "Vehicles", href: "/vehicles" },
    { id: "planets", label: "Planets", href: "/planets" },
    { id: "film", label: "Film", href: "/film" },
    { id: "species", label: "Species", href: "/species" },
  ] as const;

  return (
    <div className="flex flex-wrap gap-3 border-b border-neutral-800 pb-6 mb-8">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <Link
            key={cat.id}
            href={cat.href}
            className={`px-5 py-2 rounded-full text-sm uppercase tracking-wider font-mono transition-all ${
              isActive
                ? "bg-orange-500 text-black font-medium shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600"
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
