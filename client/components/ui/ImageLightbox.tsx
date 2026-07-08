"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface ImageLightboxProps {
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const currentImage = images[activeIndex];

  useEffect(() => {
    const originalWindowStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalWindowStyle;
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (activeIndex === null || images.length === 0) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 h-[100vh] z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-300"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-neutral-400 hover:text-white text-3xl font-light transition-colors z-50"
      >
        ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-0 p-3 text-neutral-400 hover:text-yellow-500 hover:scale-110 text-6xl transition-all duration-300 select-none"
      >
        ‹
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[85vh] flex items-center justify-center px-12"
      >
        <img
          src={currentImage}
          alt="Archived image in full size"
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-neutral-800"
        />
      </div>

      <button
          onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-0 p-3 text-neutral-400 hover:text-yellow-500 hover:scale-110 text-6xl transition-all duration-300 select-none"
      >
        ›
      </button>

      <div className="absolute bottom-10 text-sm tracking-widest text-neutral-500 uppercase">
        {activeIndex + 1} / {images.length}
      </div>
    </div>,
    document.body
  );
};
