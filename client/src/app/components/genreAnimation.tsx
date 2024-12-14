"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Image from "next/image";

const SCROLL_SPEED = 0.5;

export function GenreAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollX = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      const newScrollX = scrollX.get() - SCROLL_SPEED;
      scrollX.set(newScrollX);

      if (newScrollX <= -container.scrollWidth / 2) {
        scrollX.set(0);
      }

      controls.set({ x: newScrollX });
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animation);
  }, [controls, scrollX]);

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Sci-Fi",
    "Horror",
    "Romance",
    "Thriller",
    "Animation",
  ];

  return (
    <div className="overflow-hidden" ref={containerRef}>
      <motion.div className="flex" style={{ x: scrollX }} animate={controls}>
        {[...genres, ...genres].map((genre, index) => (
          <div key={index} className="flex-shrink-0 w-48 h-48 m-2">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <Image
                src={`/placeholder.svg?height=200&width=200&text=${genre}`}
                alt={genre}
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
