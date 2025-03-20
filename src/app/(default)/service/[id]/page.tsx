import Testimonial from '@/components/Home/Testimonial'
import CourseInfo from '@/components/service/ServicesDetails/CourseInfo'
import DetailsHero from '@/components/service/ServicesDetails/DetailsHero'
import YourLearning from '@/components/service/YourLearning'
import React from 'react'

export default function page() {
  return (
    <div>
        <DetailsHero/>
        <CourseInfo/>
        <Testimonial/>
         <YourLearning/>
    </div>
  )
}
