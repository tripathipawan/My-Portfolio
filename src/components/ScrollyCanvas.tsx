"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 108; // 000 to 107

function getFramePath(index: number) {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.055s.webp`;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderFrame = (index: number) => {
      const img = images[Math.round(index)];
      if (!img) return;

      // Handle Object Fit Cover logic
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Render initial frame
    renderFrame(0);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameIndex.get());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const unsubscribe = frameIndex.on("change", (latest) => {
      renderFrame(latest);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [isLoaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover" />
        
        {/* Loading overlay to prevent flashing */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212] text-white z-50">
            <p className="text-sm font-mono animate-pulse">Loading experience...</p>
          </div>
        )}

        {/* Text Overlay */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
