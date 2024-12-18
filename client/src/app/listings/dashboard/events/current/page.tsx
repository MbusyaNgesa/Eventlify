import { EventList } from "@/app/components/dashboard/eventList";

export default function CurrentEventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Current Events</h1>
      <EventList title="Current Events" status="current" />
    </div>
  );
}
