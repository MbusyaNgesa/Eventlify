"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EventDetails } from "@/app/components/eventDetails";
import { ImageUpload } from "@/app/components/dashboard/imageUpload";

export default function NewEventPage() {
  const router = useRouter();
  const [eventData, setEventData] = useState({
    name: "",
    date: new Date(),
    location: "",
    description: "",
    ticketPrice: "",
    images: [] as File[],
    mainImageIndex: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleDateChange = (date: Date | undefined) => {
  //   if (date) {
  //     setEventData((prev) => ({ ...prev, date }));
  //   }
  // };

  const handleImagesChange = (images: File[]) => {
    setEventData((prev) => ({ ...prev, images }));
  };

  const handleMainImageChange = (index: number) => {
    setEventData((prev) => ({ ...prev, mainImageIndex: index }));
  };

  const handleSubmit = (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Submitting event:", { ...eventData, isDraft });
    // Redirect to the appropriate page
    router.push(
      isDraft
        ? "/listings/dashboard/events/drafts"
        : "/listings/dashboard/events/current"
    );
  };

  const previewEvent = {
    ...eventData,
    id: "preview",
    images: eventData.images.map((file) => URL.createObjectURL(file)),
    tickets: {
      advance: { price: parseFloat(eventData.ticketPrice) || 0 },
      regular: { price: parseFloat(eventData.ticketPrice) || 0 },
      vip: { price: parseFloat(eventData.ticketPrice) || 0 },
    },
    vendors: [],
    relatedEvents: [],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add New Event</h1>
      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Event Name</Label>
          <Input
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Event Date</Label>
          <DatePicker
          //  date={eventData.date} setDate={handleDateChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ticketPrice">Ticket Price</Label>
          <Input
            id="ticketPrice"
            name="ticketPrice"
            type="number"
            value={eventData.ticketPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Event Images</Label>
          <ImageUpload
            onImagesChange={handleImagesChange}
            onMainImageChange={handleMainImageChange}
          />
        </div>
        <div className="flex space-x-4">
          <Button type="submit">Create Event</Button>
          <Button
            type="button"
            variant="outline"
            onClick={(e) => handleSubmit(e, true)}
          >
            Save as Draft
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="secondary">
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <EventDetails event={previewEvent} isPreview={true} />
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  );
}
