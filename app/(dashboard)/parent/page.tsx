import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import React from 'react'

const ParentPage = () => {
  return (
    <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
       <div className="w-full xl:w-2/3">
       <div className="rounded-md bg-white h-full p-4">
          <h1 className='font-semibold text-xl'>Schedule (X.Y)</h1>
          <BigCalendar/>
       </div>
       </div>
      <div className="w-full xl:w-1/3">
        <Announcements/>
      </div>
    </div>
  )
}

export default ParentPage