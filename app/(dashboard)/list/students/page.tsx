import Pagination from "@/components/Pagination";
import { Table } from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Student ID",
        accessor: "studentId",
        className: "hidden md:table-cell",
    },
    {
        header: "Grade",
        accessor: "grade",
        className: "hidden md:table-cell",
    },
    {
        header: "Phone",
        accessor: "phone",
        className: "hidden lg:table-cell",
    },
    {
        header: "Address",
        accessor: "address",
        className: "hidden lg:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

interface Student {
    id: number;
    studentId: string;
    name: string;
    email?: string;
    grade: number;
    photo: string;
    phone?: string;
    class: string;
    address: string;
}
const StudentListPage = () => {
    const renderRow = (item: Student) => {
        return (
            <tr
                key={item.id}
                className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lPurpleLight"
            >
                <td>
                    <Image
                        src={item.photo}
                        alt=""
                        width={40}
                        height={40}
                        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.class}</p>
                    </div>
                </td>
                <td className="hidden md:table-cell">{item.studentId}</td>
                <td className="hidden md:table-cell">{item.class}</td>
                <td className="hidden md:table-cell">{item.grade}</td>
                <td className="hidden md:table-cell">{item.phone}</td>
                <td className="hidden md:table-cell">{item.address}</td>
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/list/teachers/${item.id}`}>
                            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lSky">
                                <Image src="/view.png" alt="" width={16} height={16} />
                            </button>
                        </Link>
                        {role === "admin" && (
                            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lPurple">
                                <Image src="/delete.png" alt="" width={16} height={16} />
                            </button>
                        )}
                    </div>
                </td>
            </tr>
        );
    };
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lYellow">
                            <Image alt="" src="/filter.png" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lYellow">
                            <Image alt="" src="/sort.png" width={14} height={14} />
                        </button>
                        {
                            role === "admin" && <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lYellow">
                                <Image alt="" src="/plus.png" width={14} height={14} />
                            </button>
                        }
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={studentsData} />
            <Pagination />
        </div>
    );
};

export default StudentListPage;