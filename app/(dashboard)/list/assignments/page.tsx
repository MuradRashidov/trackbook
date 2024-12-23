import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { Table } from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/constants";
import {
  assignmentsData,
  role,
} from "@/lib/data";
import prisma from "@/lib/prisma";
import { Assignment, Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type SingleAssigment = Assignment & {
  Lesson: Lesson & {
    subject: Subject;
    class: Class;
    teacher: Teacher
  }
}

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const renderRow = (item: SingleAssigment) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lPurpleLight"
  >
    <td className="p-4">{item.title}</td>
    <td className="p-4">{item.Lesson.subject.name}</td>
    <td>{item.Lesson.class.name}</td>
    <td className="hidden md:table-cell">{[item.Lesson.teacher.name," ", item.Lesson.teacher.surname]}</td>
    <td className="hidden md:table-cell">{item.dueTime.toDateString()}</td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormModal table="assignment" type="delete" data={item} />
            <FormModal table="assignment" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
    {/* <td>
              <div className="flex items-center gap-2">
                  <Link href={`/list/teachers/${item.id}`}>
                      <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lSky">
                          <Image src="/edit.png" alt="" width={16} height={16} />
                      </button>
                  </Link>
                  {role === "admin" && (
                      <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lPurple">
                          <Image src="/delete.png" alt="" width={16} height={16} />
                      </button>
                  )}
              </div>
          </td> */}
  </tr>
);
const AssignmentListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
 
  const { page, ...queryParams } = searchParams;
  const p = page ? +page : 1;
  const query: Prisma.AssignmentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      switch (key) {
        case "teacherId":
          query.lesson = { teacherId: value }
          break;
        case "clasId":
          query.lesson = { classId: parseInt(value!) }
          break;
        case "search":
          query.title = { contains: value, mode: 'insensitive' }
          break;

        default:
          break;
      }
    }
  }
  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            teacher: {
              select: { name: true, surname: true }
            },
            class: { select: { name: true } },
            subject: { select: { name: true } }

          }
        }
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
    }),
    prisma.assignment.count({ where: query })
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher" ) && <FormModal table="assignment" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination count={count} page={p} />
    </div>
  );
};

export default AssignmentListPage;