"use client";

import { AccordionSectionData } from "@/types/AccordionSectionData";
import Link from "next/link";

interface AccordionSectionProps {
  section: AccordionSectionData;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  section,
  isOpen,
  onToggle,
}) => {
  const { title, content } = section;

  const isMultiple = Array.isArray(content);

  return (
    <div className="border border-neutral-950/40 rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-sm">
      <button
        onClick={onToggle}
        type="button"
        className="w-full flex justify-between items-center px-6 py-4 text-left font-bold tracking-wider uppercase text-neutral-400 hover:text-yellow-500 hover:bg-neutral-900/20 transition-all duration-300 focus:outline-none"
      >
        <span className="text-sm">{title}</span>
        <span
          className={`text-xs transition-all duration-300 ease-in-out ${isOpen ? "rotate-180 text-yellow-500" : "text-neutral-600"}`}
        >
          ▼
        </span>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500] border-t border-neutral-800/40 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-6 bg-neutral-900/10 text neutral-300 text-sm">
          {isMultiple ? (
            <ul className="flex flex-col gap-3 list-disc list-inside">
              {content.map((item, index) => (
                <li
                  key={index}
                  className="text-neutral-400 marker:text-neutral-700"
                >
                  <Link
                    href={item.url}
                    className="font-mono text-neutral-300 hover:text-yellow-500 border-b border-transparent hover:border-yellow-500/30 transition-all duration-300 inline-block pl-1"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex item-center gap-2">
              <span className="text-neutral-600 text-xs font-mono">📍</span>
              <Link
                href={content.url}
                className="font-mono text-neutral-300 hover:text-yellow-500 border-b border-transparent hover:border-yellow-500/30 transition-all duration-300"
              >
                {content.title}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
