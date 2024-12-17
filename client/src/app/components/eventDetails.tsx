"use client";

import { useState } from "react";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { EventCard } from "./cardGrid";

import Image from "next/image";
interface TicketType {
  type: "advance" | "regular" | "vip";
  price: number;
  quantity: number;
}
interface Event {
  id: string;
  name: string;
  images: string[];
  tickets: {
    advance: { price: number };
    regular: { price: number };
    vip: { price: number };
  };
  date: string;
  location: string;
  genre?: string;
  hostName?: string;
  description?: string;
  vendors?: Vendor[];
  relatedEvents?: RelatedEvent[];
}

interface Vendor {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface RelatedEvent {
  id: string;
  name: string;
  images: string[];
  location: string;
}

interface EventDetailsProps {
  event: Event;
  isPreview?: boolean;
}

export function EventDetails({ event, isPreview = false }: EventDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tickets, setTickets] = useState<TicketType[]>([
    { type: "advance", price: event.tickets.advance.price, quantity: 0 },
    { type: "regular", price: event.tickets.regular.price, quantity: 0 },
    { type: "vip", price: event.tickets.vip.price, quantity: 0 },
  ]);

  const totalQuantity = tickets.reduce(
    (sum, ticket) => sum + ticket.quantity,
    0
  );
  const totalAmount = tickets.reduce(
    (sum, ticket) => sum + ticket.price * ticket.quantity,
    0
  );

  const updateTicketQuantity = (
    type: TicketType["type"],
    increment: boolean
  ) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.type === type
          ? {
              ...ticket,
              quantity: Math.max(0, ticket.quantity + (increment ? 1 : -1)),
            }
          : ticket
      )
    );
  };

  return (
    <div
      className={`container mx-auto px-4 py-8 space-y-8 ${
        isPreview ? "max-h-[80vh] overflow-y-auto" : ""
      }`}
    >
      {/* Image Carousel */}
      <Card className="overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="relative aspect-[2/1] overflow-hidden">
            <Image
              src={event.images[currentImageIndex]}
              alt={`${event.name} photo ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentImageIndex((i) =>
                    i > 0 ? i - 1 : event.images.length - 1
                  )
                }
                className="rounded-full bg-background/80"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentImageIndex((i) =>
                    i < event.images.length - 1 ? i + 1 : 0
                  )
                }
                className="rounded-full bg-background/80"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-2">
                {event.images.map((image: string, index: number) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${event.name} thumbnail ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                      index === currentImageIndex ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </ScrollArea>
            <h1 className="text-2xl font-bold mt-4">{event.name}</h1>
          </div>
        </CardContent>
      </Card>

      {/* Event Details */}
      <div className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View more Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Event Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Host</h3>
                <p>{event.hostName || "TBA"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Description</h3>
                <p>{event.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Info className="h-4 w-4" />
          {new Date(event.date).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {event.location}
        </div>
        {event.genre && (
          <div className="text-muted-foreground">Genre: {event.genre}</div>
        )}
      </div>

      {/* Tickets */}
      {!isPreview && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.type}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold capitalize">
                      {ticket.type}
                    </div>
                    <div className="text-muted-foreground">${ticket.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateTicketQuantity(ticket.type, false)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{ticket.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateTicketQuantity(ticket.type, true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>KES 0</span>
              </div>
              <div className="flex justify-between">
                <span>Amount</span>
                <span>KES {totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Tickets</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Amount</span>
                <span>KES {totalAmount.toFixed(2)}</span>
              </div>
              <Button className="w-full">Book Now</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Vendors */}
      {!isPreview && event.vendors && event.vendors.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Vendors</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex gap-4 p-4">
              {event.vendors.map((vendor) => (
                <Dialog key={vendor.id}>
                  <DialogTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0 w-48 cursor-pointer"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="mt-2 font-semibold">{vendor.name}</h3>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{vendor.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Image
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <p>{vendor.description}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Related Events */}
      {!isPreview && event.relatedEvents && event.relatedEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Events you may like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {event.relatedEvents.map((relatedEvent: any) => (
              <motion.div
                key={relatedEvent.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <EventCard event={relatedEvent} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
