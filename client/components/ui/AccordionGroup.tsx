"use client";

import { AccordionSectionData } from "@/types/AccordionSectionData";
import { useState } from "react";
import { AccordionSection } from "./AccordionSection";

interface AccordionGroupProps {
  sections: AccordionSectionData[];
}

export const AccordionGroup: React.FC<AccordionGroupProps> = ({ sections }) => {
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {sections.map((section) => (
        <AccordionSection
          key={section.id}
          section={section}
          isOpen={openSectionId === section.id}
          onToggle={() => handleToggle(section.id)}
        />
      ))}
    </div>
  );
};
