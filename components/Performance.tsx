"use client"
import Image from 'next/image';
import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 92, fill:"#C3EBFA" },
  { name: 'Group B', value: 8, fill: "#FAE27C" }
];
const Performance = () => {
  return (
    <div className='bg-white p-4 rounded-md relative'>
        <div className="flex items-center justify-between">
            <h1 className='text-xl font-semibold'>Performance</h1>
            <Image alt='' src="/moreDark.png" width={16} height={16}/>
        </div>
        <ResponsiveContainer width="100%" height="90%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 transform -translate-y-1/2 text-center">
        <h1 className='text-3xl font-bold'>9.2</h1>
        <p className='text-xs text-gray-300'>of 10 max TS</p>
      </div>
      <h2 className="absolute bottom-16 left-0 right-0 m-auto text-center">!Semestr-2Semestr</h2>
    </div>
  )
}

export default Performance