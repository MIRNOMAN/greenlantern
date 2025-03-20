
import WhyChooseUsSection from "@/components/Home/WhyChooseUsSection";
import AboutFaq from "@/components/shop/AboutFaq";
import GreatStory from "@/components/shop/GreatStory";
import ShopHero from "@/components/shop/ShopHero";
import React from "react";

export default function page() {
  return <div>
    <ShopHero/>
    <GreatStory/>
    <WhyChooseUsSection/>
  <AboutFaq/>
  </div>;
}
