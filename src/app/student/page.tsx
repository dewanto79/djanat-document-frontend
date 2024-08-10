"use client";
import { getStudentList } from "@/service/student";
import { EStudentStatus, GetStudentListParams } from "@/types/student";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/16/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useRequest } from "ahooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { handleNumberInput, translateColor } from "@/utils";
import Chip from "../components/Chip";

export default function Student() {
  const [filter, setFilter] = useState<GetStudentListParams>({
    keyword: "",
    status: "",
    grade: "",
    limit: 10,
    page: 1,
  });

  const { run, data, loading, error } = useRequest(getStudentList);

  useEffect(() => {
    let temp = { ...filter };
    for (var propName in temp) {
      if (
        temp[propName as keyof typeof temp] === null ||
        temp[propName as keyof typeof temp] === undefined ||
        temp[propName as keyof typeof temp] === ""
      ) {
        delete temp[propName as keyof typeof temp];
      }
    }
    run(temp);
  }, [filter]);

  return (
    <div className={`flex flex-col gap-6 p-4 md:px-10 md:py-10`}>
      {/* Headers */}
      <div
        className={`flex flex-col gap-6 md:flex-row items-start md:items-center justify-between`}
      >
        <div>
          <h1 className={`text-3xl font-bold`}>Student</h1>
          <p className={`mt-2 text-gray-400`}>List of all students</p>
        </div>
        <Link href={`/student/create`} className={`w-full md:w-fit`}>
          <Button className={`font-medium gap-2 w-full justify-center`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create Student
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div
        className={`rounded-2xl border border-gray-200 shadow-sm  flex flex-col divide-y`}
      >
        {/* Filter Status */}
        <div
          className={`px-5 flex items-center gap-6 transition-colors duration-300`}
        >
          <button
            onClick={() => {
              setFilter((prev) => ({ ...prev, status: "" }));
            }}
            className={`aspect-square transition-colors duration-300 py-6 ${
              filter.status === ""
                ? "font-bold border-b-2 border-black "
                : "font-normal"
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setFilter((prev) => ({ ...prev, status: EStudentStatus.ACTIVE }));
            }}
            className={`aspect-square transition-colors duration-300  py-6 ${
              filter.status === EStudentStatus.ACTIVE
                ? "font-bold border-b-2 border-green-700 text-green-700 "
                : "font-normal"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => {
              setFilter((prev) => ({
                ...prev,
                status: EStudentStatus.INACTIVE,
              }));
            }}
            className={`aspect-square transition-colors duration-300  py-6 ${
              filter.status === EStudentStatus.INACTIVE
                ? "font-bold border-b-2 border-red-700 text-red-700 "
                : "font-normal"
            }`}
          >
            Inactive
          </button>
        </div>

        {/* Filter */}
        <div
          className={`flex flex-col md:flex-row items-center gap-3 w-full px-5 py-6`}
        >
          <select
            onChange={(e) => {
              setFilter((prev) => ({ ...prev, grade: e.target.value }));
            }}
            className={`border border-gray-200 p-3 rounded-lg w-full md:w-[300px] hover:outline-gray-500 focus:outline-black`}
          >
            <option selected hidden value={``}>
              Start Grade
            </option>
            <option value={``}>All</option>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((rows) => (
              <option key={rows} value={rows + 1}>
                {rows + 1}
              </option>
            ))}
          </select>
          <div
            className={`flex gap-2 items-center px-3 py-3 border-2 border-gray-200  rounded-lg w-full focus-within:border-black `}
          >
            <MagnifyingGlassIcon className={`text-gray-500 size-4`} />
            <input
              placeholder={`Search...`}
              className={`focus:outline-none`}
              type={`text`}
            />
          </div>
        </div>
        {/* Table */}

        <div className="relative overflow-x-auto z-10 ">
          <table className="w-full text-sm text-left rtl:text-right text-primaryText ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Grade
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {loading ? (
              [0, 1, 2, 3].map((rows, index) => (
                <tbody key={index}>
                  <tr className="bg-white border-b  ">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      <div className={`flex items-center gap-4`}>
                        <div
                          className={`w-11 h-11 text-xl bg-gray-500 animate-pulse text-white flex items-center justify-center rounded-[100%]`}
                        />

                        <div className={`flex flex-col`}>
                          <div
                            className={`h-4 w-[150px] bg-gray-500 animate-pulse rounded-lg`}
                          />
                          <p className={`text-gray-400`}></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`h-4 w-[50px] bg-gray-500 animate-pulse rounded-lg`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`bg-gray-500 w-[50px] animate-pulse  px-3 py-1 rounded-full h-5 `}
                      />
                    </td>
                    <td className="px-6 py-4 ">
                      <div
                        className={`bg-gray-500 w-[50px] animate-pulse  px-3 py-1 rounded-full h-5 `}
                      />
                    </td>
                  </tr>
                </tbody>
              ))
            ) : error ? (
              <div
                className={`w-full flex items-center text-primaryText font-bold text-2xl px-5 py-10`}
              >
                DATA NOT FOUND
              </div>
            ) : (
              data?.result.items.map((rows, index) => (
                <tbody key={index}>
                  <tr className="bg-white border-b  ">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-primaryText whitespace-nowrap "
                    >
                      <div className={`flex items-center gap-4`}>
                        <div
                          className={`w-11 h-11 text-xl bg-primaryText text-white flex items-center justify-center rounded-[100%]`}
                        >
                          {" "}
                          JJ
                        </div>
                        <div className={`flex flex-col`}>
                          <p>{rows.fullname}</p>
                          <p className={`text-gray-400`}></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{rows.grade}</td>
                    <td className="px-6 py-4">
                      <Chip color={translateColor(rows.status)}>
                        {rows.status}
                      </Chip>
                    </td>
                    <td className="px-6 py-4 ">
                      <Link
                        href={`/student/edit/${rows.id}`}
                        className={`flex items-center gap-2 hover:text-primary`}
                      >
                        <PencilSquareIcon className={`size-6`} />
                        Edit
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))
            )}
            <tbody className={`w-full`}>{}</tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className={`flex w-full justify-end items-center py-3 gap-4 px-5`}>
          <button
            disabled={filter.page === 1}
            onClick={() => {
              setFilter((prev) => ({ ...prev, page: Number(prev.page) - 1 }));
            }}
            className={`disabled:text-secondaryText text-primaryText`}
          >
            <ChevronLeftIcon className={` size-6 shrink-0 `} />
          </button>
          <input
            onChange={(e) => {
              if (e.target.value === "") {
                setFilter((prev) => ({
                  ...prev,
                  page: "",
                }));
              } else if (
                Number(e.target.value) > data?.result.meta.totalPages!
              ) {
                setFilter((prev) => ({
                  ...prev,
                  page: data?.result.meta.totalPages!,
                }));
              } else {
                setFilter((prev) => ({
                  ...prev,
                  page: Number(handleNumberInput(e.target.value)),
                }));
              }
            }}
            onBlur={(e) => {
              setFilter((prev) => ({ ...prev, page: Number(e.target.value) }));
            }}
            value={filter.page}
            className={`w-[40px] border border-secondaryText text-center focus:outline-none focus:border-accents focus:border-2 rounded-sm`}
            type={`text`}
          />
          <p>of</p>
          <p>{data?.result.meta.totalPages}</p>
          <button
            disabled={filter.page === data?.result.meta.totalPages}
            onClick={() => {
              setFilter((prev) => ({ ...prev, page: Number(prev.page) + 1 }));
            }}
            className={`disabled:text-secondaryText text-primaryText`}
          >
            <ChevronRightIcon className={`text-inherit size-6 shrink-0 `} />
          </button>
        </div>
      </div>
    </div>
  );
}
