import React from 'react';
export interface CarouselProps {
    children: React.ReactNode[];
    autoPlay?: boolean;
    interval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    loop?: boolean;
    className?: string;
    tw?: string;
}
/**
 * Carousel component for displaying content in a slideshow.
 * Supports auto-play, navigation arrows, dots, and keyboard navigation.
 */
export declare function Carousel({ children, autoPlay, interval, showDots, showArrows, loop, className, tw, }: CarouselProps): import("react/jsx-runtime").JSX.Element;
export interface CarouselSlideProps {
    children: React.ReactNode;
    className?: string;
    tw?: string;
}
/**
 * CarouselSlide component for individual slides.
 */
export declare function CarouselSlide({ children, className, tw }: CarouselSlideProps): import("react/jsx-runtime").JSX.Element;
export interface CarouselImageProps {
    src: string;
    alt: string;
    aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
    objectFit?: 'cover' | 'contain' | 'fill';
    className?: string;
    tw?: string;
}
/**
 * CarouselImage component optimized for carousel slides.
 */
export declare function CarouselImage({ src, alt, aspectRatio, objectFit, className, tw, }: CarouselImageProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook for managing carousel state externally.
 */
export declare function useCarousel(totalSlides: number, options?: {
    loop?: boolean;
}): {
    currentIndex: number;
    goToSlide: (index: number) => void;
    goToPrevious: () => void;
    goToNext: () => void;
    canGoPrevious: boolean;
    canGoNext: boolean;
};
