import React, { useState } from 'react';
import { createComponent } from '../core/createComponent';
import { mergeTw } from '../core/mergeTw';

/**
 * Gallery component for displaying images in various grid layouts.
 */
export const Gallery = createComponent({
  as: 'div',
  displayName: 'Gallery',
  base: 'w-full',
  variants: {
    columns: {
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '5': 'grid-cols-5',
      '6': 'grid-cols-6',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
  },
  defaultVariants: {
    columns: '3',
    gap: 'md',
  },
});

export interface GalleryImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill';
  onClick?: () => void;
  className?: string;
  tw?: string;
}

/**
 * GalleryImage component for individual images in the gallery.
 */
export function GalleryImage({
  src,
  alt,
  aspectRatio = 'square',
  objectFit = 'cover',
  onClick,
  className,
  tw,
}: GalleryImageProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  };

  return (
    <div
      className={mergeTw(
        'relative overflow-hidden rounded-lg bg-gray-100',
        aspectRatioClasses[aspectRatio],
        onClick && 'cursor-pointer hover:opacity-90 transition-opacity',
        className,
        tw
      )}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className={mergeTw(
          'w-full h-full',
          objectFitClasses[objectFit]
        )}
        loading="lazy"
      />
    </div>
  );
}

export interface GalleryLightboxProps {
  images: Array<{ src: string; alt: string }>;
  currentIndex: number;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

/**
 * Lightbox component for viewing images in full screen.
 */
export function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  const currentImage = images[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) onPrevious();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasPrevious, hasNext, onClose, onPrevious, onNext]);

  // Lock body scroll
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Close lightbox"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      {hasPrevious && onPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Previous image"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-7xl max-h-[90vh] px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[90vh] object-contain"
        />
        {/* Image counter */}
        <div className="text-white text-center mt-4">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Next button */}
      {hasNext && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Next image"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

/**
 * Hook for managing gallery lightbox state.
 */
export function useGalleryLightbox(images: Array<{ src: string; alt: string }>) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const open = (index: number) => setCurrentIndex(index);
  const close = () => setCurrentIndex(null);
  const next = () => {
    if (currentIndex !== null && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const previous = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    isOpen: currentIndex !== null,
    currentIndex: currentIndex ?? 0,
    open,
    close,
    next,
    previous,
  };
}
