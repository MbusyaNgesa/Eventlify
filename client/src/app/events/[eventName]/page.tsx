import { EventDetails } from "@/app/components/eventDetails";

interface PageProps {
  params: {
    eventName: string;
  };
}

export default function EventPage({ params }: PageProps) {
  // In a real app, fetch event data based on eventName
  const eventData = {
    id: "1",
    name: "Summer Jazz Festival",
    images: [
      "/placeholder.svg?height=400&width=800&text=Event+Photo+1",
      "/placeholder.svg?height=400&width=800&text=Event+Photo+2",
      "/placeholder.svg?height=400&width=800&text=Event+Photo+3",
    ],
    date: "2024-01-20",
    location: "Central Park, NY",
    genre: "Jazz",
    description: "Join us for an evening of smooth jazz under the stars...",
    hostName: "Jazz Entertainment Inc.",
    tickets: {
      advance: { price: 79.99 },
      regular: { price: 99.99 },
      vip: { price: 199.99 },
    },
    vendors: [
      {
        id: 1,
        name: "Jazz Cafe",
        image: "/placeholder.svg?height=200&width=200&text=Vendor+1",
        description: "Serving the finest coffee and snacks",
      },
      {
        id: 2,
        name: "Sound Systems",
        image: "/placeholder.svg?height=200&width=200&text=Vendor+2",
        description: "Professional audio equipment",
      },
      {
        id: 3,
        name: "Event Decor",
        image: "/placeholder.svg?height=200&width=200&text=Vendor+3",
        description: "Beautiful event decorations",
      },
      {
        id: 4,
        name: "Security Services",
        image: "/placeholder.svg?height=200&width=200&text=Vendor+4",
        description: "Professional security services",
      },
    ],
    relatedEvents: [
      {
        id: 1,
        image: "/placeholder.svg?height=300&width=300&text=Related+1",
        date: "2024-02-15",
        name: "Blues Night",
        location: "Jazz Club, NY",
        price: 59.99,
      },
      // ... more related events
    ],
  };

  return <EventDetails event={eventData} />;
}
