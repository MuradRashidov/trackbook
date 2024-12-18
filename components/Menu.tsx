import { menuItems } from '@/constants/menuItems';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MenuProps {
  
}

export const Menu = ({}: MenuProps) => {
  return (<div className='mt-4 text-sm'>
            {
                menuItems.map((i) => (
                    <div className='flex flex-col gap-2' key={i.title}>
                        <span className='hidden lg:block text-gray-400 font-light'>{i.title}</span>
                        {i.items.map((item) => (
                            <Link className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2' href={item.href} key={item.label}>
                                <Image src={item.icon} alt='' width={20} height={20}/>
                                <span className='hidden lg:block'>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                ))
            }
        </div>);
};