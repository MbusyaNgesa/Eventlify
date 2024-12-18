import Image from "next/image";
import defaultImage from "../defaultImage.png";
export function Hero() {
  return (
    <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={defaultImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20">
        <div className="container h-full flex items-center">
          <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden">
            <Image
              src={defaultImage}
              alt="Featured"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// export function Hero() {
//   return (
//     <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
//       <div className="absolute inset-0">
//         <Image
//           src="/placeholder.svg?height=300&width=1200"
//           alt="Background"
//           width={1200}
//           height={300}
//           className="object-cover w-full h-full"
//           priority
//         />
//       </div>
//       <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20">
//         <div className="container h-full flex items-center">
//           <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden">
//             <Image
//               src="/placeholder.svg?height=200&width=200"
//               alt="Featured"
//               width={200}
//               height={200}
//               className="object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
