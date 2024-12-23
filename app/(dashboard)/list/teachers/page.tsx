import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { Table } from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/constants";
import { role, teachersData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Class, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Teacher ID",
        accessor: "teacherId",
        className: "hidden md:table-cell",
    },
    {
        header: "Subjects",
        accessor: "subjects",
        className: "hidden md:table-cell",
    },
    {
        header: "Classes",
        accessor: "classes",
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

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[]};

const TeacherListPage = async ({searchParams}:{searchParams: { [key: string]: string | undefined}}) => {
    console.log("Teachers: ", searchParams);
    const { page, ...queryParams } = searchParams;
    const classId = queryParams.classId ? parseInt(queryParams.classId) : undefined;

    const p = page ? +page : 1
    const [data,count] = await prisma.$transaction([
        prisma.teacher.findMany({ where:{
            lessons: {some: {classId}}
        },include:{
            classes: true,
            subjects: true
        }, take:ITEM_PER_PAGE, skip: ITEM_PER_PAGE*(p - 1)}),
        prisma.teacher.count({where:{
            lessons: {some: {classId}}
        }})
    ]);
    

    
    const renderRow = (item: TeacherList) => {
        return (
            <tr
                key={item.id}
                className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lPurpleLight"
            >
                <td>
                    <Image
                        src={item.img || "/noAvatar.png"}
                        alt=""
                        width={40}
                        height={40}
                        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item?.email}</p>
                    </div>
                </td>
                <td className="hidden md:table-cell">{item.username}</td>
                <td className="hidden md:table-cell">{item.subjects.map(subject => subject.name).join(',')}</td>
                <td className="hidden md:table-cell">{item.classes.map(classItem => classItem.name).join(",")}</td>
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
                            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lPurple">
                            //     <Image src="/delete.png" alt="" width={16} height={16} />
                            // </button>
                            <FormModal table="teacher" type="delete" id={item.id as any }/>

                        )}
                    </div>
                </td>
            </tr>
        );
    };
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All teachers</h1>
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
                            // role === "admin" && <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lYellow">
                            //     <Image alt="" src="/plus.png" width={14} height={14} />
                            // </button>
                            <FormModal table="teacher" type="create"/>
                        }
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={data} />
            <Pagination page={p} count={count}/>
        </div>
    );
};

export default TeacherListPage;
