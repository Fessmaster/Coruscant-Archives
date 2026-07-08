"use client";
import React, { useState } from "react";
import { CardBox } from "./CardBox";
import { ImageLightbox } from "./ImageLightbox";

interface EntityGalleryProps {
  name: string;
  mainImage: string | undefined;
  gallery: string[] | undefined;
  metaFields: { label: string; value?: string | number | null }[];
}

const LIMIT = 8;

export const EntityGallery: React.FC<EntityGalleryProps> = ({
  name,
  mainImage,
  gallery = [],
  metaFields = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasAdditionalImages = gallery.length > 0;
  const showLoadMortButton = gallery.length > LIMIT;
  const visibleThumbnails = isExpanded ? gallery : gallery.slice(0, LIMIT);
  const allImages = mainImage ? [mainImage, ...gallery] : gallery;
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((activeModalIndex + 1) % allImages.length);
  };

  const handlePrev = () => {
    if (activeModalIndex === null) return;
    setActiveModalIndex(
      (activeModalIndex - 1 + allImages.length) % allImages.length,
    );
  };

  return (
    <div
      className={`w-full ${hasAdditionalImages ? "grid grid-cols-1 lg:grid-cols-3 gap-6 items-start" : "flex justify-center"}`}
    >
      <div
        onClick={() => mainImage && setActiveModalIndex(0)}
        className={`w-full ${mainImage ? "cursor-pointer" : ""} ${!hasAdditionalImages ? "max-w-md mx-auto" : "col-span-1"}`}
      >
        <CardBox imageUrl={mainImage}>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text white tracking-wide">
              {name}
            </h3>
            {metaFields.length > 0 && (
              <div className="pt-2 border-t border-neutral-800/60 space-y-0.5 text-[11px] text-neutral-500 font-mono">
                {metaFields.map((field, idx) => (
                  <div key={idx}>
                    ({field.label}:{""}
                    <span className="text-neutral-300"> {field.value}</span>)
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardBox>
      </div>

      {hasAdditionalImages && (
        <div className="col-span-1 lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-[10rem]">
          {visibleThumbnails.map((imgUrl, index) => {
            const globalIndex = mainImage ? index + 1 : index;

            return (
              <div
                key={index}
                onClick={() => setActiveModalIndex(globalIndex)}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer hover:yellow-500/40 transition-all duration-300"
              >
                <img
                  src={imgUrl}
                  alt={`${name} gallery element ${index + 1}`}
                  className="w-full h-full object-cover grayscale-[20%] opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-colors duration-300" />
              </div>
            );
          })}

          {showLoadMortButton && (
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-xl cursor-pointer hover:border-yellow-500/50 transition-colors duration-300 min-h-[150px]"
            >
              <span className="text-sm font-bold tracking-wider uppercase text-neutral-400 hover:text-white transition-colors">
                {isExpanded ? "Hide" : "Load More"}
              </span>
            </div>
          )}
        </div>
      )}
      {activeModalIndex !== null && (
        <ImageLightbox
          images={allImages}
          activeIndex={activeModalIndex}
          onClose={() => setActiveModalIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};
