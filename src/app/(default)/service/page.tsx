import AllProducts from '@/components/service/AllProducts'
import ServiceHero from '@/components/service/ServiceHero'
import YourLearning from '@/components/service/YourLearning'
import React from 'react'

export default function page() {
  return (
    <div>
        <ServiceHero/>
        <AllProducts/>
        <YourLearning/>
    </div>
  )
}
