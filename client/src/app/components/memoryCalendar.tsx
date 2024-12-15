"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Memory {
  id: number;
  month: string;
  image: string;
}

const memories: Memory[] = [
  {
    id: 1,
    month: "June",
    image: "/placeholder.svg?height=400&width=400&text=June+Memory+1",
  },
  {
    id: 2,
    month: "June",
    image: "/placeholder.svg?height=400&width=400&text=June+Memory+2",
  },
  {
    id: 3,
    month: "July",
    image: "/placeholder.svg?height=400&width=400&text=July+Memory+1",
  },
  {
    id: 4,
    month: "July",
    image: "/placeholder.svg?height=400&width=400&text=July+Memory+2",
  },
  {
    id: 5,
    month: "August",
    image: "/placeholder.svg?height=400&width=400&text=August+Memory+1",
  },
  {
    id: 6,
    month: "August",
    image: "/placeholder.svg?height=400&width=400&text=August+Memory+2",
  },
];

export function MemoryCalendar() {
  const months = ["June", "July", "August"];
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const filteredMemories = memories.filter(
    (memory) => memory.month === selectedMonth
  );

  const scrollNext = () => {
    if (scrollPosition < filteredMemories.length - 2) {
      setScrollPosition((prev) => prev + 1);
    }
  };

  const scrollPrev = () => {
    if (scrollPosition > 0) {
      setScrollPosition((prev) => prev - 1);
    }
  };

  return (
    <div className="flex gap-8">
      <div className="flex flex-col items-center space-y-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const currentIndex = months.indexOf(selectedMonth);
            if (currentIndex > 0) {
              setSelectedMonth(months[currentIndex - 1]);
              setScrollPosition(0);
            }
          }}
          disabled={selectedMonth === months[0]}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>

        <div className="space-y-2 py-2">
          {months.map((month) => (
            <Button
              key={month}
              variant={month === selectedMonth ? "default" : "ghost"}
              className="w-24"
              onClick={() => {
                setSelectedMonth(month);
                setScrollPosition(0);
              }}
            >
              {month}
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const currentIndex = months.indexOf(selectedMonth);
            if (currentIndex < months.length - 1) {
              setSelectedMonth(months[currentIndex + 1]);
              setScrollPosition(0);
            }
          }}
          disabled={selectedMonth === months[months.length - 1]}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className="flex gap-4">
          <AnimatePresence mode="wait">
            {filteredMemories
              .slice(scrollPosition, scrollPosition + 3)
              .map((memory, index) => (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 ${index === 2 ? "w-1/3" : "w-1/2"}`}
                >
                  <Link href={`/memories/${memory.month.toLowerCase()}`}>
                    <div
                      className={`relative aspect-square rounded-lg overflow-hidden ${
                        index === 2 ? "opacity-50" : ""
                      }`}
                    >
                      <img
                        src={memory.image}
                        alt={`Memory from ${memory.month}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={scrollPosition === 0}
            className="rounded-full"
          >
            <ChevronUp className="h-4 w-4 rotate-90" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={scrollPosition >= filteredMemories.length - 2}
            className="rounded-full"
          >
            <ChevronDown className="h-4 w-4 rotate-90" />
          </Button>
        </div>
      </div>
    </div>
  );
}
