/**
 * Gallery component for displaying images in various grid layouts.
 */
export declare const Gallery: import("..").PolymorphicComponent<import("..").InferVariantProps<{
    columns: {
        '1': string;
        '2': string;
        '3': string;
        '4': string;
        '5': string;
        '6': string;
    };
    gap: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
}>, "div">;
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
export declare function GalleryImage({ src, alt, aspectRatio, objectFit, onClick, className, tw, }: GalleryImageProps): import("react/jsx-runtime").JSX.Element;
export interface GalleryLightboxProps {
    images: Array<{
        src: string;
        alt: string;
    }>;
    currentIndex: number;
    onClose: () => void;
    onPrevious?: () => void;
    onNext?: () => void;
}
/**
 * Lightbox component for viewing images in full screen.
 */
export declare function GalleryLightbox({ images, currentIndex, onClose, onPrevious, onNext, }: GalleryLightboxProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook for managing gallery lightbox state.
 */
export declare function useGalleryLightbox(images: Array<{
    src: string;
    alt: string;
}>): {
    isOpen: boolean;
    currentIndex: number;
    open: (index: number) => void;
    close: () => void;
    next: () => void;
    previous: () => void;
};
