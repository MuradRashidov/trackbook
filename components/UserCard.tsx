import Image from 'next/image';
import React from 'react';

interface UserCardProps {
  type: string;
}

export const UserCard = ({ type }: UserCardProps) => {
  return (
    <div className='rounded-2xl odd:bg-lPurple even:bg-lYellow p-4 flex-1 min-w-[130px]'>
        <div className='flex  items-center justify-between'>
            <span className='text-[10px] bg-white text-green-600 rounded-full px-2 py-1'>2024/25</span>
            <Image src='/more.png' alt='' width={20} height={20}/>
        </div>
        <h1 className='text-2xl font-semibold my-4'>1,234</h1>
        <h2 className='capitalize text-sm font-medium text-gray-500'>{`${type}s`}</h2>
    </div>);
};