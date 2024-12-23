import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { Table } from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/constants";
import { role, parentsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Parent, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Student Names",
        accessor: "students",
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

type ParentList = Parent & { students: Student[] }
const renderRow = (item: ParentList) => {
    return (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lPurpleLight"
        >
            <td>
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item?.email}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.students.map((student) => student.name).join(",")}</td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/Parents/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lSky">
                            <Image src="/view.png" alt="" width={16} height={16} />
                        </button>
                    </Link>
                    {role === "admin" && (
                        // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lPurple">
                        //     <Image src="/delete.png" alt="" width={16} height={16} />
                        // </button>
                        <>
                            <FormModal table="parent" type="delete" />
                            <FormModal table="parent" type="update" data={item} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};
const ParentListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    const { page, ...queryParams } = searchParams;
    console.log("page",page,"queryparams",queryParams.search);
    
    const p = page ? +page : 1;
    console.log('p',p);
    
    const query: Prisma.ParentWhereInput = {};
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) { 
            switch (key) {
                case "search":
                    query.name = { contains: value, mode: "insensitive" }
                default:
                    break;
            }}
        }
    }
    const [data, count] = await prisma.$transaction([
        prisma.parent.findMany({
            where: query,
            include: { students: true },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.parent.count({ where: query })
    ])

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
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
                            role === "admin" && <FormModal table="parent" type="create" />
                            // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lYellow">
                            //     <Image alt="" src="/plus.png" width={14} height={14} />
                            // </button>
                        }
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={data} />
            <Pagination count={count} page={p} />
        </div>
    );
};

export default ParentListPage;
