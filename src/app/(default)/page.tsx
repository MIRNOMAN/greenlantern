import AboutSection from "@/components/Home/AboutSection";
import Faq from "@/components/Home/Faq";
import HeroSection from "@/components/Home/HeroSection";
import ServicesSection from "@/components/Home/ServicesSection";
import Testimonial from "@/components/Home/Testimonial";
import WhyChooseUsSection from "@/components/Home/WhyChooseUsSection";


export default function Home() {
  return (
    <div>
      <HeroSection/>
      <AboutSection/>
      <ServicesSection/>
      <WhyChooseUsSection/>
      <Testimonial/>
      <Faq/>
    </div>
  );
}
