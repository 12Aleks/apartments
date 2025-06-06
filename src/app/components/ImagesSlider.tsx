"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";
import { Card, cn } from "@nextui-org/react";

interface Props {
    images: string[];
    overlay?: React.ReactNode;
    overlayClassName?: string;
    className?: string;
    autoplay?: boolean;
    direction?: "up" | "down";
}

export const ImagesSlider = ({
                                 images,
                                 overlay = false,
                                 overlayClassName,
                                 className,
                                 autoplay = true,
                                 direction = "up",
                             }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadedImages, setLoadedImages] = useState<string[]>([]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === images.length ? 0 : prevIndex + 1
        );
    }, [images.length]);

    const handlePrevious = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        );
    }, [images.length]);

    const loadImages = useCallback(() => {
        setLoading(true);
        const loadPromises = images.map((image) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = image;
                img.onload = () => resolve(image);
                img.onerror = reject;
            });
        });

        Promise.all(loadPromises)
            .then((loadedImages) => {
                setLoadedImages(loadedImages as string[]);
                setLoading(false);
            })
            .catch((error) => console.error("Failed to load images", error));
    }, [images]);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") {
                handleNext();
            } else if (event.key === "ArrowLeft") {
                handlePrevious();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        let interval: NodeJS.Timeout | undefined;

        if (autoplay) {
            interval = setInterval(() => {
                handleNext();
            }, 8000);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (interval) clearInterval(interval);
        };
    }, [autoplay, handleNext, handlePrevious]);

    const slideVariants = {
        initial: {
            scale: 0,
            opacity: 0,
            rotateX: 45,
        },
        visible: {
            scale: 1,
            rotateX: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.645, 0.045, 0.355, 1.0],
            },
        },
        upExit: {
            opacity: 1,
            y: "-150%",
            transition: {
                duration: 1,
            },
        },
        downExit: {
            opacity: 1,
            y: "150%",
            transition: {
                duration: 1,
            },
        },
    };

    const areImagesLoaded = loadedImages.length > 0;

    return (
        <Card
            className={cn(
                "overflow-hidden h-full w-full relative flex items-center justify-center",
                className
            )}
            style={{
                perspective: "1000px",
            }}
        >
            {areImagesLoaded && overlay && (
                <div
                    className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
                />
            )}

            {areImagesLoaded && (
                <AnimatePresence>
                    <motion.img
                        key={currentIndex}
                        src={loadedImages[currentIndex]}
                        initial="initial"
                        animate="visible"
                        exit={direction === "up" ? "upExit" : "downExit"}
                        variants={slideVariants}
                        className="image h-full w-full absolute inset-0 object-cover object-center"
                    />
                </AnimatePresence>
            )}
            {/* Left Arrow */}
            <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/50 hover:bg-black/30 transition-background text-whitecd  w-10 h-10 rounded-full"
            >
                &#8592;
            </button>

            {/* Right Arrow */}
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/50 hover:bg-black/30 transition-background text-white w-10 h-10  rounded-full"
            >
                &#8594;
            </button>
        </Card>
    );
};