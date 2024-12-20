import React from 'react';

interface TableProps {
    columns: {
        header: string;
        accessor: string;
        classname?: string
    }[],
    renderRow: (item: any) => React.ReactNode;
    data: any[]
}

export const Table = ({ columns, data, renderRow }: TableProps) => {
    return (
        <table className='w-full mt-4'>
            <thead>

                <tr className='text-left text-gray-500 text-sm'>
                    {columns.map((col) => (
                        <th className={col.classname} key={col.accessor}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item) => (renderRow(item)))
                }
            </tbody>
        </table>
    );
};