import Image from 'next/image';
import React from 'react';

interface NavbarProps {
  
}

export const Navbar = ({}: NavbarProps) => {
  return (
    <div className='flex items-center justify-between p-4'>
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <Image src="/search.png" alt='' width={14} height={14}/>
            <input type="text" className="w-[200px] p-2 bg-transparent outline-none" placeholder='search...'/>
        </div>
        <div  className='flex items-center gap-6 justify-end w-full'>
            <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
                <Image src='/message.png' alt='/' width={20} height={20}/>
            </div>
            <div className='bg-white relative rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
                <Image src='/announcement.png' alt='/' width={20} height={20}/>
                <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 rounded-full text-sm text-white">1</div>
            </div>
            <div className='flex flex-col'>
                <span className='text-xs font-medium leading-3'>P.A</span>
                <span className='text-[10px] text-gray-500 text-right'>Admin</span>
            </div>
            <Image src="/avatar.png" width={36} height={36} alt="" className="rounded-full"/>
        </div>
    </div>);
};