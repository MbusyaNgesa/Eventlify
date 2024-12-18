import { EventDetails } from "@/app/components/eventDetails";

interface PageProps {
  params: {
    // id: string;
    eventName: string;
  };
}

export default function EventPage({ params }: PageProps) {
  //Fetch event data based on eventName
  const { eventName } = params;

  // // Placeholder for future fetch logic
  console.log(`Fetching event data for: ${eventName}`);
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
      advance: { price: 1000 },
      regular: { price: 2000 },
      vip: { price: 5000 },
    },
    vendors: [
      {
        id: "1",
        name: "Jazz Cafe",
        image: "/placeholder.svg?height=200&width=200&text=Vendor+1",
        description: "Serving the finest coffee and snacks",
      },
      {
        id: "2",
        name: "Sound Systems",
        image: "/placeholder.svg?height=200&width=200&text=Vendor+2",
        description: "Professional audio equipment",
      },
      {
        id: "3",
        name: "Event Decor",
        image: "/placeholder.svg?height=200&width=200&text=Vendor+3",
        description: "Beautiful event decorations",
      },
      {
        id: "4",
        name: "Security Services",
        image: "/placeholder.svg?height=200&width=200&text=Vendor+4",
        description: "Professional security services",
      },
    ],
    relatedEvents: [
      {
        _id: "1",
        images: ["/placeholder.svg?height=300&width=300&text=Related+1"],
        date: "2024-02-15",
        name: "Blues Night",
        location: "Jazz Club, NY",
        tickets: {
          advance: { price: 1500 },
          regular: { price: 2500 },
          vip: { price: 4000 },
        },
        price: 2100,
      },
      // ... more related events
    ],
  };

  return <EventDetails event={eventData} />;
}

//https://home-service-ke.vercel.app/
