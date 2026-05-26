"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { personal } from "@/data/portfolioData";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 25% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: 55% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Section 1 */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
          {personal.name}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-light">
          {personal.role} & Creative Developer
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-semibold text-white max-w-2xl leading-tight">
          I build digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">experiences</span>.
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center px-8 md:px-24 text-right"
      >
        <h2 className="text-4xl md:text-6xl font-semibold text-white max-w-2xl leading-tight">
          Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">design</span> and engineering.
        </h2>
      </motion.div>
    </div>
  );
}
