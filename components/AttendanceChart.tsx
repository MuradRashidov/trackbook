"use client"
import Image from 'next/image';
import React from 'react'

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Mon',
    present: 60,
    absent: 40
  },
  {
    name: 'Tue',
    present: 70,
    absent: 60
  },
  {
    name: 'Wed',
    present: 90,
    absent: 75
  },
  {
    name: 'Thu',
    present: 90,
    absent: 75
  },
  {
    name: 'Fri',
    present: 55,
    absent: 65
  }
];

const AttendanceChart = () => {
  return (
    <div className='h-full p-4 bg-whiterounded-md'>
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Attendance</h1>
            <Image src='/moreDark.png' alt='' width={20} height={20}/>
        </div>
         <ResponsiveContainer width="100%" height="98%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd' />
          <XAxis axisLine={false} dataKey="name" tick={{fill:"#d1d5db"}} tickLine={false} />
          <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
          <Tooltip contentStyle={{borderRadius:"10px", borderColor:"lightgray"}} />
          <Legend align='left' verticalAlign='top' wrapperStyle={{paddingTop:"20px", paddingBottom:"40px"}} />
          <Bar radius={[10,10,0,0]} legendType='circle' dataKey="present" fill="#fae27c" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar radius={[10,10,0,0]}  legendType='circle' dataKey="absent" fill="#c3ebfa" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttendanceChart