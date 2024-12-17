"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getUserProfile, logout } from "../services/api";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

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
          {user ? (
            <>
              <Link
                href="/listings"
                className="text-muted-foreground hover:text-foreground"
              >
                Listings
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="rounded-full"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="text-muted-foreground hover:text-foreground"
              >
                Sign Up
              </Link>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
