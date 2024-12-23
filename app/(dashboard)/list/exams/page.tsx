import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { Table } from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/constants";
import { examsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Class, Exam, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type SingleExam = Exam & {
  lesson: Lesson & {
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
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const renderRow = (item: SingleExam) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="p-4">{item.title}</td>
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">{[item.lesson.teacher.name," ", item.lesson.teacher.surname]}</td>
    <td className="hidden md:table-cell">{item.startTime.toDateString()}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" || role === "teacher" ? (
          <>
            <FormModal table="exam" type="update" data={item} />
            <FormModal table="exam" type="delete" id={item.id} />
          </>
        ) : null}
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

const ExamListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

  const { page, ...queryParams } = searchParams;
  const p = page ? +page : 1;
  const query: Prisma.ExamWhereInput = {};
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
    prisma.exam.findMany({
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
    prisma.exam.count({ where: query })
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" || role === "teacher" ? <FormModal table="exam" type="create" /> : null}
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

export default ExamListPage;