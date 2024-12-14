// 'use client'

// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import Image from "next/image"

// interface CardGridProps {
//   animate?: boolean
// }

// export function CardGrid({ animate = false }: CardGridProps) {
//   const cards = Array(4).fill(null)

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {cards.map((_, i) => (
//           animate ? (
//             <motion.div
//               key={i}
//               className="aspect-square rounded-lg overflow-hidden"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Image
//                 src={`/placeholder.svg?height=300&width=300&text=Card${i + 1}`}
//                 alt={`Card ${i + 1}`}
//                 width={300}
//                 height={300}
//                 className="object-cover w-full h-full"
//               />
//             </motion.div>
//           ) : (
//             <div
//               key={i}
//               className="aspect-square rounded-lg overflow-hidden"
//             >
//               <Image
//                 src={`/placeholder.svg?height=300&width=300&text=Card${i + 1}`}
//                 alt={`Card ${i + 1}`}
//                 width={300}
//                 height={300}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           )
//         ))}
//       </div>
//       <div className="flex justify-center">
//         <Button variant="outline">Show more</Button>
//       </div>
//     </div>
//   )
// }
