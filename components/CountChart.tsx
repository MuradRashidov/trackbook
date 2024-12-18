"use client"
import Image from 'next/image';
import React from 'react'
import { Legend, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
const data = [
    {
      name: 'Total',
      count: 90,
      fill: 'white',
    },
    {
        name: 'Girls',
        count: 50,
        fill: '#fae27c',
      },
    {
      name: 'Boys',
      count: 40,
      fill: '#c3ebfa',
    }
  ];
const CountChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        <div className="flex justify-between items-center">
            <h3 className='text-lg font-semibold'>Students</h3>
            <Image src='/moreDark.png' alt='' width={20} height={20}/>
        </div>
        <div className="w-full relative h-[75%]">
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                    <RadialBar
                        background
                        dataKey="count"
                    />
                </RadialBarChart>
        </ResponsiveContainer>
        <Image 
        src="/maleFemale.png" 
        alt='' 
        width={50} 
        height={50}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
        </div>
        <div className="flex justify-center gap-16">
            <div className="flex flex-col gap-1">
                <div className='w-5 h-5 bg-lSky rounded-full'/>
                <h1 className='font-bold'>1,234</h1>
                <h2 className='text-xs text-gray-300'>Boys (55%)</h2>
            </div>
            <div className="flex flex-col gap-1">
                <div className='w-5 h-5 bg-lYellow rounded-full'/>
                <h1 className='font-bold'>1,234</h1>
                <h2 className='text-xs text-gray-300'>Girls (45%)</h2>
            </div>
        </div>
    </div>
  )
}

export default CountChart