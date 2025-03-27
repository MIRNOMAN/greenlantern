"use client"

import { useState } from "react"
import contact_icon_1 from "@/assets/icons/Icon & text (1).png"
import contact_icon_2 from "@/assets/icons/Icon & text (2).png"
import contact_icon_3 from "@/assets/icons/Icon & text.png"
import { useForm } from "react-hook-form"
import Image from "next/image"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  interface FormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log(data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()

    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#682D70]  dark:text-black flex flex-col items-center justify-center p-4 md:p-8">
       <div className="flex items-center mx-auto border w-[110px] p-1 justify-center border-[#ECECEC] rounded-2xl mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F5E663] mr-2"></div>
            <span className="text-white text-sm  font-medium">Contact Us</span>
          </div>

      <h1 className="text-[#F5E663] text-3xl md:mt-10  mt-5 md:text-[56px] leading-[64px] font-semibold MB-5 md:mb-10 text-center ">
        Contact Us Today
      </h1>

      <div className="w-full md:max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="bg-white rounded-lg p-6 md:p-8  md:translate-x-[-20px] animate-[fadeInLeft_0.6s_ease-in-out_0.3s_forwards]">
          <div className="mb-8 h-[200px] md:h-[250px] overflow-hidden rounded-md">
            {/* Google Maps iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d58429.17745164245!2d90.4200191623308!3d23.753669400255763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sPharmacies!5e0!3m2!1sen!2sbd!4v1742440757288!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-black md:text-[20px] leading-[28px] font-semibold mb-1">Phone</h3>
              <p className="text-[#343333] md:text-[16px] leading-[26px] font-normal-opacity-80">(015) 84-582-973</p>
            </div>

            <div>
              <h3 className="text-black md:text-[20px] leading-[28px] font-semiboldmb-1">Office</h3>
              <p className="text-[#343333] md:text-[16px] leading-[26px] font-normal-opacity-80">859 dream avenue, New York</p>
            </div>

            <div className="flex gap-4 py-4">
              <a
                href="https://web.whatsapp.com"
                className="flex items-center justify-center border-[#ECECEC] w-[140px] h-[46px] rounded-md border border-gray-200 transition-transform hover:scale-110 active:scale-95"
              >
               <Image src={contact_icon_3} alt="Contact Icon 1" className=""/>
              </a>
              <a
                href="https://x.com/i/flow/login"
                className="flex items-center justify-center border-[#ECECEC] w-[140px] h-[46px] rounded-md border border-gray-200 transition-transform hover:scale-110 active:scale-95"
              >
               <Image src={contact_icon_1} alt="Contact Icon 1" className=""/>
              </a>
              <a
                href="https://web.whatsapp.com"
                className="flex items-center justify-center border-[#ECECEC] w-[140px] h-[46px] rounded-md border border-gray-200 transition-transform hover:scale-110 active:scale-95"
              >
                <Image src={contact_icon_2} alt="Contact Icon 1" className=""/>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-lg p-6 md:p-8  md:translate-x-[20px] animate-[fadeInRight_0.6s_ease-in-out_0.4s_forwards]">
          <h2 className="text-purple-900 text-[32px] leading-[40px] font-semibold  mb-6">Get In Touch</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                className={`w-full p-3 border border-[#ECECEC] ${errors.name ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
                {...register("name", { required: true })}
              />
              {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full p-3 border border-[#ECECEC] ${errors.email ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email?.type === "required" && <span className="text-red-500 text-sm">Email is required</span>}
              {errors.email?.type === "pattern" && <span className="text-red-500 text-sm">Invalid email address</span>}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone"
                className={`w-full p-3 border border-[#ECECEC] ${errors.phone ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
                {...register("phone")}
              />
            </div>

            <div>
              <textarea
                placeholder="Message"
                rows={5}
                className={`w-full p-3 border border-[#ECECEC] ${errors.message ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
                {...register("message", { required: true })}
              />
              {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-300 text-black font-medium py-3 rounded-[60px] transition-all duration-300 hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : isSubmitted ? "Submitted!" : "Submit Now"}
            </button>

            {isSubmitted && (
              <div className="text-black text-center animate-[fadeIn_0.3s_ease-in-out]">
                Thank you! Your message has been sent successfully.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

