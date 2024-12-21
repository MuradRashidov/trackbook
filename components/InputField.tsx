import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputFieldProps {
    label: string;
    type?: string;
    register: any;
    name: string;
    defaultValue?: string;
    error?: FieldError;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputField = ({
    label,
    name,
    register,
    defaultValue,
    error,
    inputProps,
    type
}: InputFieldProps) => {
    return (
        
             <div className='flex flex-col gap-2 w-full md:w-1/4'>
                <label htmlFor="" className='text-xs text-gray-500'>{label}</label>
                <input 
                {...register(name)} 
                type={type} 
                {...inputProps} 
                className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
                defaultValue={defaultValue}
                />
                {error?.message && (<p className='text-xs text-red-400'>{error?.message.toString()}</p>)}
            </div>
        
    );
};

export default InputField;