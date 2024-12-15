import { EventList } from "@/app/components/dashboard/eventList";

export default function PreviousEventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Previous Events</h1>
      <EventList title="Previous Events" status="previous" />
    </div>
  );
}
