import React from 'react'

const Announcements = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
      <div className='flex items-center justify-between'>
          <h1 className='semibold text-xl'>Announcements</h1>
          <span className='text-xs text-gray-400'>View All</span>
      </div>
      <div className='flex flex-col gap-4 mt-4'></div>
      <div className="rounded-md bg-lSkyLight p-4">
        <div className="flex items-center justify-between">
          <h2 className='font-medium'>Lorem ipsum dolor sit.</h2>
          <span className='text-sm text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-01</span>
        </div>
        <p className='text-sm text-gray-400 mt-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic ex earum dolorem in omnis quis.</p>
      </div>
      <div className='flex flex-col gap-4 mt-4'></div>
      <div className="rounded-md bg-lPurpleLight p-4">
        <div className="flex items-center justify-between">
          <h2 className='font-medium'>Lorem ipsum dolor sit.</h2>
          <span className='text-sm text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-01</span>
        </div>
        <p className='text-sm text-gray-400 mt-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic ex earum dolorem in omnis quis.</p>
      </div>
      <div className='flex flex-col gap-4 mt-4'></div>
      <div className="rounded-md bg-lYellowLight p-4">
        <div className="flex items-center justify-between">
          <h2 className='font-medium'>Lorem ipsum dolor sit.</h2>
          <span className='text-sm text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-01</span>
        </div>
        <p className='text-sm text-gray-400 mt-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic ex earum dolorem in omnis quis.</p>
      </div>
    </div>
  )
}

export default Announcements