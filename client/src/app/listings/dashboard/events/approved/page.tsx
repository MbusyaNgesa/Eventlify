import { EventList } from "@/app/components/dashboard/eventList";

export default function ApprovedEventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Approved Events</h1>
      <EventList title="Approved Events" status="approved" />
    </div>
  );
}
