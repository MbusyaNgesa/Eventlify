import Link from "next/link";
import {
  Home,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Ticket,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  return (
    <div className="w-64 bg-card text-card-foreground p-4 space-y-4 h-screen overflow-y-auto">
      <div className="text-2xl font-bold">Event Lister</div>
      <nav className="space-y-2">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/listings/dashboard">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/listings/dashboard/events/current">
            <Calendar className="mr-2 h-4 w-4" />
            Current Events
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/listings/dashboard/events/previous">
            <Clock className="mr-2 h-4 w-4" />
            Previous Events
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/listings/dashboard/events/approved">
            <CheckCircle className="mr-2 h-4 w-4" />
            Approved Events
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/listings/dashboard/events/declined">
            <XCircle className="mr-2 h-4 w-4" />
            Declined Events
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/listings/dashboard/events/drafts">
            <FileText className="mr-2 h-4 w-4" />
            Drafts
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/listings/dashboard/tickets">
            <Ticket className="mr-2 h-4 w-4" />
            Tickets
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/listings/dashboard/vendors">
            <Users className="mr-2 h-4 w-4" />
            Vendors
          </Link>
        </Button>
      </nav>
    </div>
  );
}
