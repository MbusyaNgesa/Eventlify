import { EventList } from "@/app/components/dashboard/eventList";

export default function DeclinedEventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Declined Events</h1>
      <EventList title="Declined Events" status="declined" />
    </div>
  );
}
