import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { Table } from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/constants";
import { role, subjectsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const columns = [
    {
        header: "Subject Name",
        accessor: "name",
    },
    {
        header: "Teachers",
        accessor: "teachers",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

type SingleSubject = Subject & { teachers: Teacher[] }
const renderRow = (item: SingleSubject) => {
    return (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lPurpleLight"
        >
            <td className="flex items-center gap-4">{item.name}</td>
            <td className="hidden md:table-cell">{item.teachers.map(teacher => teacher.name).join(", ")}</td>

            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/Parents/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lSky">
                            <Image src="/edit.png" alt="" width={16} height={16} />
                        </button>
                    </Link>
                    {role === "admin" && (
                        <div className="flex items-center gap-2">
                            {role === "admin" && (
                                <>
                                    <FormModal table="subject" type="update" data={item} />
                                    <FormModal table="subject" type="delete" id={item.id} />
                                </>
                            )}
                        </div>
                        // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lPurple">
                        //     <Image src="/delete.png" alt="" width={16} height={16} />
                        // </button>
                    )}
                </div>
            </td>
        </tr>
    );
};
const ParentListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    const { page, ...queryParams } = searchParams;
    const p = page ? +page : 1;
    const query: Prisma.SubjectWhereInput = {};
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            switch (key) {
                case "search":
                    query.name = { contains: value, mode: 'insensitive' }
                    break;

                default:
                    break;
            }
        }
    }
    const [data, count] = await prisma.$transaction([
        prisma.subject.findMany({
            where: query,
            include: { teachers: true },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1)
        }),
        prisma.subject.count({ where: query })
    ]);

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
                            role === "admin" && <FormModal table="subject" type="create" />
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
