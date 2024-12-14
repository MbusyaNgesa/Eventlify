"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function MemoryCalendar() {
  const months = ["June", "July", "August"];
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  return (
    <div className="space-y-4">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex p-4">
          {months.map((month) => (
            <Button
              key={month}
              variant={month === selectedMonth ? "default" : "ghost"}
              className="mx-1"
              onClick={() => setSelectedMonth(month)}
            >
              {month}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src="/placeholder.svg?height=300&width=400&text=Full+photo"
            alt="Full photo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src="/placeholder.svg?height=300&width=400&text=Half+photo"
            alt="Half photo"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
