// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { DatePicker } from "@/components/ui/date-picker"

// export default function NewEventPage() {
//   const router = useRouter()
//   const [eventData, setEventData] = useState({
//     name: '',
//     date: new Date(),
//     location: '',
//     description: '',
//     ticketPrice: '',
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setEventData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleDateChange = (date: Date | undefined) => {
//     if (date) {
//       setEventData(prev => ({ ...prev, date }))
//     }
//   }

//   const handleSubmit = (e: React.FormEvent, isDraft: boolean) => {
//     e.preventDefault()
//     // Here you would typically send the data to your backend
//     console.log('Submitting event:', { ...eventData, isDraft })
//     // Redirect to the appropriate page
//     router.push(isDraft ? '/listings/dashboard/events/drafts' : '/listings/dashboard/events/current')
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Add New Event</h1>
//       <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
//         <div className="space-y-2">
//           <Label htmlFor="name">Event Name</Label>
//           <Input
//             id="name"
//             name="name"
//             value={eventData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="date">Event Date</Label>
//           <DatePicker
//             date={eventData.date}
//             setDate={handleDateChange}
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="location">Location</Label>
//           <Input
//             id="location"
//             name="location"
//             value={eventData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="description">Description</Label>
//           <Textarea
//             id="description"
//             name="description"
//             value={eventData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="ticketPrice">Ticket Price</Label>
//           <Input
//             id="ticketPrice"
//             name="ticketPrice"
//             type="number"
//             value={eventData.ticketPrice}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex space-x-4">
//           <Button type="submit">Create Event</Button>
//           <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, true)}>Save as Draft</Button>
//         </div>
//       </form>
//     </div>
//   )
// }
