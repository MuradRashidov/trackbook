import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import EventCalendar from '@/components/EventCalendar'
import React from 'react'

const StudentPage = () => {
  return (
    <div className='flex flex-col gap-4 xl:flex-row'>
       <div className="w-full xl:w-2/3">
       <div className="rounded-md bg-white h-full p-4">
          <h1 className='font-semibold text-xl'>Schedule (4A)</h1>
          <BigCalendar/>
       </div>
       </div>
      <div className="w-full xl:w-1/3">
        <EventCalendar/>
        <Announcements/>
      </div>
    </div>
  )
}

export default StudentPage