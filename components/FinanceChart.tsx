"use client"
import Image from 'next/image'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
    {
      name: 'Jan',
      income: 4000,
      expense: 2400
    },
    {
      name: 'Feb',
      income: 3000,
      expense: 1398
    },
    {
      name: 'Mar',
      income: 2000,
      expense: 9800
    },
    {
      name: 'Apr',
      income: 2780,
      expense: 3908
    },
    {
      name: 'May',
      income: 1890,
      expense: 4800
    },
    {
      name: 'Jun',
      income: 2390,
      expense: 3800
    },
    {
      name: 'Jul',
      income: 3490,
      expense: 4300
    },
    {
      name: 'Aug',
      income: 2000,
      expense: 9800
    },
    {
      name: 'Sep',
      income: 2780,
      expense: 3908
    },
    {
      name: 'Oct',
      income: 1890,
      expense: 4800
    },
    {
      name: 'Nov',
      income: 2390,
      expense: 3800
    },
    {
      name: 'Dec',
      income: 3490,
      expense: 4300
    },
  ];
const FinanceChart = () => {
  return (
    <div className='h-full p-4 bg-whiterounded-md'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Finance</h1>
                <Image src='/moreDark.png' alt='' width={20} height={20}/>
            </div>
            <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke='#ddd' />
          <XAxis dataKey="name" tick={{fill:"#d1d5db"}} axisLine={{ stroke: "#d1d5db" }} tickLine={false} tickMargin={10} />
          <YAxis tick={{fill:"#d1d5db"}} tickLine={false}   axisLine={{ stroke: "#d1d5db" }} tickMargin={20} />
          <Tooltip />
          <Legend align='center' verticalAlign='top' wrapperStyle={{paddingTop:"10px", paddingBottom:"30px"}} />
          <Line type="monotone" dataKey="income" stroke="#c3ebfa" strokeWidth={5} />
          <Line type="monotone" dataKey="expense" stroke="#cfceff" strokeWidth={5}  />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default FinanceChart