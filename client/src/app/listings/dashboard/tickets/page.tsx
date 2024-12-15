import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ticketSales = [
  {
    id: 1,
    eventName: "Summer Jazz Festival",
    ticketsSold: 500,
    revenue: 25000,
  },
  {
    id: 2,
    eventName: "Tech Conference 2024",
    ticketsSold: 750,
    revenue: 37500,
  },
  { id: 3, eventName: "Food & Wine Expo", ticketsSold: 300, revenue: 15000 },
];

export default function TicketsPage() {
  const totalTickets = ticketSales.reduce(
    (sum, sale) => sum + sale.ticketsSold,
    0
  );
  const totalRevenue = ticketSales.reduce((sum, sale) => sum + sale.revenue, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Ticket Sales</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Tickets Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
          </CardContent>
        </Card>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Tickets Sold</TableHead>
            <TableHead>Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ticketSales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell className="font-medium">{sale.eventName}</TableCell>
              <TableCell>{sale.ticketsSold}</TableCell>
              <TableCell>${sale.revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
