import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from 'react';
import { mergeTw } from '../core/mergeTw';
/**
 * Carousel component for displaying content in a slideshow.
 * Supports auto-play, navigation arrows, dots, and keyboard navigation.
 */
export function Carousel({ children, autoPlay = false, interval = 3000, showDots = true, showArrows = true, loop = true, className, tw, }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);
    const slides = React.Children.toArray(children);
    const totalSlides = slides.length;
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    const goToPrevious = () => {
        if (currentIndex === 0) {
            if (loop) {
                setCurrentIndex(totalSlides - 1);
            }
        }
        else {
            setCurrentIndex(currentIndex - 1);
        }
    };
    const goToNext = () => {
        if (currentIndex === totalSlides - 1) {
            if (loop) {
                setCurrentIndex(0);
            }
        }
        else {
            setCurrentIndex(currentIndex + 1);
        }
    };
    // Auto-play functionality
    useEffect(() => {
        if (!autoPlay || isHovered)
            return;
        timeoutRef.current = setTimeout(() => {
            goToNext();
        }, interval);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, autoPlay, interval, isHovered]);
    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft')
                goToPrevious();
            if (e.key === 'ArrowRight')
                goToNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);
    const canGoPrevious = loop || currentIndex > 0;
    const canGoNext = loop || currentIndex < totalSlides - 1;
    return (_jsxs("div", { className: mergeTw('relative w-full', className, tw), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), role: "region", "aria-label": "Carousel", children: [_jsx("div", { className: "relative overflow-hidden rounded-lg", children: _jsx("div", { className: "flex transition-transform duration-500 ease-out", style: { transform: `translateX(-${currentIndex * 100}%)` }, children: slides.map((slide, index) => (_jsx("div", { className: "min-w-full", "aria-hidden": index !== currentIndex, children: slide }, index))) }) }), showArrows && canGoPrevious && (_jsx("button", { onClick: goToPrevious, className: "absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-10", "aria-label": "Previous slide", children: _jsx("svg", { width: "24", height: "24", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) })), showArrows && canGoNext && (_jsx("button", { onClick: goToNext, className: "absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-10", "aria-label": "Next slide", children: _jsx("svg", { width: "24", height: "24", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })), showDots && (_jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10", children: slides.map((_, index) => (_jsx("button", { onClick: () => goToSlide(index), className: mergeTw('w-2 h-2 rounded-full transition-all', index === currentIndex
                        ? 'w-8 bg-white'
                        : 'bg-white/60 hover:bg-white/80'), "aria-label": `Go to slide ${index + 1}`, "aria-current": index === currentIndex }, index))) }))] }));
}
/**
 * CarouselSlide component for individual slides.
 */
export function CarouselSlide({ children, className, tw }) {
    return (_jsx("div", { className: mergeTw('w-full', className, tw), children: children }));
}
/**
 * CarouselImage component optimized for carousel slides.
 */
export function CarouselImage({ src, alt, aspectRatio = 'video', objectFit = 'cover', className, tw, }) {
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
    return (_jsx("div", { className: mergeTw('relative overflow-hidden bg-gray-100', aspectRatioClasses[aspectRatio], className, tw), children: _jsx("img", { src: src, alt: alt, className: mergeTw('w-full h-full', objectFitClasses[objectFit]) }) }));
}
/**
 * Hook for managing carousel state externally.
 */
export function useCarousel(totalSlides, options) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { loop = true } = options || {};
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    const goToPrevious = () => {
        if (currentIndex === 0) {
            if (loop) {
                setCurrentIndex(totalSlides - 1);
            }
        }
        else {
            setCurrentIndex(currentIndex - 1);
        }
    };
    const goToNext = () => {
        if (currentIndex === totalSlides - 1) {
            if (loop) {
                setCurrentIndex(0);
            }
        }
        else {
            setCurrentIndex(currentIndex + 1);
        }
    };
    return {
        currentIndex,
        goToSlide,
        goToPrevious,
        goToNext,
        canGoPrevious: loop || currentIndex > 0,
        canGoNext: loop || currentIndex < totalSlides - 1,
    };
}
