"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import defaultImage from "../defaultImage.png";
interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
  images: string[];
  tickets: { price: number }[];
}
interface CardGridProps {
  events: any[];
  animate?: boolean;
}

// const events = [
//   {
//     id: 1,
//     image: "/placeholder.svg?height=300&width=300&text=Event1",
//     date: "2024-01-20",
//     name: "Summer Music Festival",
//     location: "Central Park, NY",
//     price: 2000,
//   },
//   {
//     id: 2,
//     image: "/placeholder.svg?height=300&width=300&text=Event2",
//     date: "2024-01-25",
//     name: "Tech Conference 2024",
//     location: "Convention Center, SF",
//     price: 5000,
//   },
//   {
//     id: 3,
//     image: "/placeholder.svg?height=300&width=300&text=Event3",
//     date: "2024-02-01",
//     name: "Food & Wine Expo",
//     location: "Downtown Plaza, LA",
//     price: 500,
//   },
//   {
//     id: 4,
//     image: "/placeholder.svg?height=300&width=300&text=Event4",
//     date: "2024-02-05",
//     name: "Art Gallery Opening",
//     location: "Modern Museum, CHI",
//     price: 0,
//   },
// ];

export function CardGrid({ events, animate = false }: CardGridProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event) =>
          animate ? (
            <motion.div
              key={event._id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <EventCard event={event} />
            </motion.div>
          ) : (
            <EventCard key={event._id} event={event} />
          )
        )}
      </div>
      <div className="flex justify-center">
        <Button variant="outline">Show more</Button>
      </div>
    </div>
  );
}

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] relative">
        <Image
          src={event.images?.[0] || defaultImage}
          alt={event.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <h3 className="font-semibold leading-none tracking-tight">
            {event.name}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-sm">
            {/* KES {event.price.toFixed(2)} */}
            {/* KES {event.tickets[0]?.price.toFixed(2) || "N/A"} */}
            {event.tickets && event.tickets.length > 0
              ? event.tickets[0].price.toFixed(2)
              : "N/A"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// interface CardGridProps {
//   animate?: boolean;
// }

// export function CardGrid({ animate = false }: CardGridProps) {
//   const cards = Array(4).fill(null);

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {cards.map((_, i) =>
//           animate ? (
//             <motion.div
//               key={i}
//               className="aspect-square rounded-lg overflow-hidden"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Image
//                 src={`/placeholder.svg?height=300&width=300&text=Card${i + 1}`}
//                 alt={`Card ${i + 1}`}
//                 width={300}
//                 height={300}
//                 className="object-cover w-full h-full"
//               />
//             </motion.div>
//           ) : (
//             <div key={i} className="aspect-square rounded-lg overflow-hidden">
//               <Image
//                 src={`/placeholder.svg?height=300&width=300&text=Card${i + 1}`}
//                 alt={`Card ${i + 1}`}
//                 width={300}
//                 height={300}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           )
//         )}
//       </div>
//       <div className="flex justify-center">
//         <Button variant="outline">Show more</Button>
//       </div>
//     </div>
//   );
// }
