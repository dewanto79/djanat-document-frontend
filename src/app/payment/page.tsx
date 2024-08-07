"use client";
import { getStudentList } from "@/service/student";
import { EStudentStatus, GetStudentListParams } from "@/types/student";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import { useRequest } from "ahooks";
import { error } from "console";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Payment() {
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
    <div className={`px-10 py-6 flex flex-col gap-6`}>
      {/* Header */}
      <div className={`flex items-center justify-between`}>
        <div>
          <h1 className={`text-3xl font-bold text-primaryText`}>Payment</h1>
          <p className={`mt-2 text-secondaryText`}>List of all payments</p>
        </div>
        <Link href={`/payment/create`} className={``}>
          <Button className={`font-medium gap-2`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create Payment
          </Button>
        </Link>
      </div>
      <div
        className={`bg-white rounded-2xl border border-gray-200 shadow-sm  flex flex-col divide-y`}
      >
        {/* Filter Status */}
        <div
          className={`px-5  flex items-center gap-6 transition-colors duration-300`}
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
                ? "font-bold border-b-2 text-success "
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
                ? "font-bold border-b-2 text-warning border-warning "
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
                          className={`w-11 h-11 text-xl bg-black text-white flex items-center justify-center rounded-[100%]`}
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
                      <div
                        className={`bg-green-200 text-green-700 text-center px-3 py-1 rounded-full w-fit`}
                      >
                        {rows.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 ">
                      <Link
                        href={`/student/edit/${rows.id}`}
                        className={`flex items-center gap-2`}
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
      </div>
    </div>
  );
}
