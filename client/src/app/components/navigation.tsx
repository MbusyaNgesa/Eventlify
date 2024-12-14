import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="font-semibold text-lg">
            Logo
          </Link>
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="search" placeholder="Search..." className="pl-8" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/upcoming"
            className="text-muted-foreground hover:text-foreground"
          >
            Upcoming
          </Link>
          <Link
            href="/moments"
            className="text-muted-foreground hover:text-foreground"
          >
            Moments
          </Link>
          <Link
            href="/genres"
            className="text-muted-foreground hover:text-foreground"
          >
            Genres
          </Link>
          <Link
            href="/listings"
            className="text-muted-foreground hover:text-foreground"
          >
            Listings
          </Link>
          <Link
            href="/signup"
            className="text-muted-foreground hover:text-foreground"
          >
            Sign Up
          </Link>
          <Button variant="outline" className="rounded-full">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}
