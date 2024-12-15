"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialVendors = [
  {
    id: 1,
    name: "Jazz Cafe",
    email: "info@jazzcafe.com",
    eventName: "Summer Jazz Festival",
  },
  {
    id: 2,
    name: "Tech Gadgets",
    email: "sales@techgadgets.com",
    eventName: "Tech Conference 2024",
  },
  {
    id: 3,
    name: "Gourmet Delights",
    email: "hello@gourmetdelights.com",
    eventName: "Food & Wine Expo",
  },
];

export default function VendorsPage() {
  const [vendors, setVendors] = useState(initialVendors);

  const handleApprove = (id: number) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Pending Vendors</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.name}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.eventName}</TableCell>
              <TableCell>
                <Button onClick={() => handleApprove(vendor.id)}>
                  Approve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
