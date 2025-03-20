import picturer_1 from "@/assets/Home/service/3147.jpg"
import picturer_2 from "@/assets/Home/service/2149285451.jpg"
import picturer_3 from "@/assets/Home/service/2149178663.jpg"
import picturer_4 from "@/assets/Home/service/2148888835.jpg"
import picturer_5 from "@/assets/Home/service/2148888824.jpg"
import picturer_6 from "@/assets/Home/service/2148888813.jpg"
import Image from "next/image"
import Link from "next/link"

const serviceImages = [picturer_1, picturer_2, picturer_3, picturer_4, picturer_5, picturer_6]

const services = [
  {
    image: serviceImages[0],
    name: "CrediPharm",
    description:
      "making it clear that the service specializes in credentialing for pharmacists. It's simple, professional, and instantly communicates.",
  },
  {
    image: serviceImages[1],
    name: "PharmaEnroll",
    description:
      "Pharma refers to the pharmaceutical industry, while enroll emphasizes the service of enrolling pharmacists with insurance.",
  },
  {
    image: serviceImages[2],
    name: "CredentCare",
    description:
      "A blend of Credentialing and Care, this name suggests a service that takes care of the credentialing process for pharmacists.",
  },
  {
    image: serviceImages[3],
    name: "PharmaTrack",
    description:
      "PharmaTrack is a strong name that highlights the pharmaceutical focus and real-time credentialing tracking.",
  },
  {
    image: serviceImages[4],
    name: "EnrollEase",
    description:
      "EnrollEase combines enroll with ease, emphasizing the simplicity and convenience your service brings to the credentialing.",
  },
  {
    image: serviceImages[5],
    name: "QuickCred",
    description:
      "Emphasizes fast, efficient pharmacist credentialing, streamlining the process with simplicity, tracking, and a healthcare focus.",
  },
]



export default function AllProducts() {
  return (
    <section className="container md:py-[100px] px-3 md:px-0 py-[30px]">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {services.map((service, index) => (
                   <Link href={`/service/${service.name}`} key={index}>
                   <div
                     key={index}
                     className="border border-[#ECECEC] shadow-md rounded-2xl overflow-hidden  hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#F5E663] cursor-pointer"
                   >
                     {/* Image Container */}
                     <div className="p-4">
                       <div className="overflow-hidden rounded-xl">
                         <Image
                           src={service.image || "/placeholder.svg?height=272&width=400"}
                           alt={service.name}
                           width={400}
                           height={272}
                           className="w-full h-[270px] object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                         />
                       </div>
                     </div>
       
                     {/* Content */}
                     <div className="md:p-6 p-3 pt-2">
                       <h3 className="md:text-[24px] text-[20px] font-semibold leading-[32px] text-center text-[#151515] mb-3">{service.name}</h3>
                       <p className="text-[18px] font-normal leading-[28px] text-center text-[#343333]">{service.description}</p>
                     </div>
                   </div>
                   </Link>
                 ))}
               </div>
    </section>
  )
}
