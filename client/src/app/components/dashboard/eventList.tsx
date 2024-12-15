import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { EventDetails } from "../eventDetails";

interface Event {
  id: number;
  name: string;
  date: string;
  ticketsSold: number;
  revenue: number;
  status: "current" | "previous" | "approved" | "declined" | "draft";
  images: string[];
  location: string;
  description: string;
  tickets: {
    advance: { price: number };
    regular: { price: number };
    vip: { price: number };
  };
}

const events: Event[] = [
  {
    id: 1,
    name: "Summer Jazz Festival",
    date: "2024-07-15",
    ticketsSold: 500,
    revenue: 25000,
    status: "current",
    images: [
      "/placeholder.svg?height=400&width=800&text=Event+Photo+1",
      "/placeholder.svg?height=400&width=800&text=Event+Photo+2",
    ],
    location: "Central Park, NY",
    description: "A wonderful jazz festival under the summer sky.",
    tickets: {
      advance: { price: 50 },
      regular: { price: 75 },
      vip: { price: 150 },
    },
  },
  {
    id: 2,
    name: "Tech Conference 2024",
    date: "2024-09-20",
    ticketsSold: 750,
    revenue: 37500,
    status: "approved",
    images: [],
    location: "",
    description: "",
    tickets: {
      advance: { price: 0 },
      regular: { price: 0 },
      vip: { price: 0 },
    },
  },
  {
    id: 3,
    name: "Food & Wine Expo",
    date: "2024-10-05",
    ticketsSold: 300,
    revenue: 15000,
    status: "draft",
    images: [],
    location: "",
    description: "",
    tickets: {
      advance: { price: 0 },
      regular: { price: 0 },
      vip: { price: 0 },
    },
  },
  {
    id: 4,
    name: "Winter Music Festival",
    date: "2023-12-20",
    ticketsSold: 1000,
    revenue: 50000,
    status: "previous",
    images: [],
    location: "",
    description: "",
    tickets: {
      advance: { price: 0 },
      regular: { price: 0 },
      vip: { price: 0 },
    },
  },
  {
    id: 5,
    name: "Spring Art Exhibition",
    date: "2024-04-10",
    ticketsSold: 0,
    revenue: 0,
    status: "declined",
    images: [],
    location: "",
    description: "",
    tickets: {
      advance: { price: 0 },
      regular: { price: 0 },
      vip: { price: 0 },
    },
  },
];

interface EventListProps {
  title: string;
  status?: Event["status"];
}

export function EventList({ title, status }: EventListProps) {
  const filteredEvents = status
    ? events.filter((event) => event.status === status)
    : events;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        {status !== "draft" && (
          <Button asChild>
            <Link href="/listings/dashboard/events/new">Add New Event</Link>
          </Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Tickets Sold</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.name}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.ticketsSold}</TableCell>
              <TableCell>${event.revenue}</TableCell>
              <TableCell>{event.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogTitle>{event.name}</DialogTitle>
                    <EventDetails event={event} />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
