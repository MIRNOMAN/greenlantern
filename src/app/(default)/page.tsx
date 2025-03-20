import AboutSection from "@/components/Home/AboutSection";

import Faq from "@/components/Home/Faq";
import HeroSection from "@/components/Home/HeroSection";
import ServicesSection from "@/components/Home/ServicesSection";
import Testimonial from "@/components/Home/Testimonial";

import AboutWhyChooseUsSectio from "@/components/shop/AboutWhyChooseUsSectio";


export default function Home() {
  return (
    <div>
      <HeroSection/>
      <AboutSection/>
      <ServicesSection/>
      <AboutWhyChooseUsSectio/>
      <Testimonial/>
      <Faq/>
     
    </div>
  );
}
