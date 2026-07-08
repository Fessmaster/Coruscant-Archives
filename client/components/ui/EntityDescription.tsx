'use client'
import { useState } from "react";


interface EntityDescriptionProps {
  title: string;
  text: string;
}

export const EntityDescription: React.FC<EntityDescriptionProps> = ({title, text}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const SHOULD_TRUNCATE = text.length > 600;
  const displayedText = SHOULD_TRUNCATE && !isExpanded ? `${text.slice(0,600)}...` : text;

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold tracking-wider uppercase text-neutral-200 mb-4 border-b border-neutral-800/80 pb-2">
        {title}
        </h3>
        <p className="text-neutral-400 leading-relax text-base font-light whitespace-pre-line">
          {displayedText}
        </p>
      </div>

      {SHOULD_TRUNCATE && (
        <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-6 text-sm font-semibold text-yellow-500/80 hover:text-yellow-400 uppercase tracking-widest transition-colors duration-200 self-start focus:outline-none"
        >
          {isExpanded ? 'Collapse Archive ▲' : 'Read Full Log ▼'}
        </button>
      )}
    </div>
  )
}