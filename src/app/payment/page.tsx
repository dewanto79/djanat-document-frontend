"use client";
import { getStudentList } from "@/service/student";
import { EStudentStatus, GetStudentListParams } from "@/types/student";

import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { useRequest } from "ahooks";
import { error } from "console";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { deletePayment, getPayment } from "@/service/payment";
import {
  EPaymentStatus,
  GetPaymentParams,
  PaymentListProps,
} from "@/types/payment/getPaymentList";
import {
  currencyFormat,
  getInitialFromName,
  handleNumberInput,
  numberFormat,
  translateColor,
} from "@/utils";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Month } from "@/types/payment/postPayment";
import Input from "../components/Input";
import FeedbackModals from "../components/FeedbackModals";
import ConfirmationModals from "../components/ConfirmationModals";
import Chip from "../components/Chip";

export default function Payment() {
  const [filter, setFilter] = useState<GetPaymentParams>({
    keyword: "",
    status: "",
    month: "",
    year: 2024,
    limit: 10,
    page: 1,
  });
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<PaymentListProps>();

  const { run, data, loading, error } = useRequest(getPayment);
  const { runAsync: deleteData } = useRequest(deletePayment);

  const handleDeleteData = () => {
    setConfirmDelete(false);
    deleteData(selectedData?.id!)
      .then((res) => {
        run({});
      })
      .catch((err) => {
        alert("Failed to delete data");
      });
  };

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
    <div className={`flex flex-col gap-6`}>
      {/* Header */}
      <div
        className={`flex flex-col md:flex-row items-start md:items-center gap-6 justify-between`}
      >
        <div>
          <h1 className={`text-3xl font-bold text-primaryText`}>Payment</h1>
          <p className={`mt-2 text-secondaryText`}>List of all payments</p>
        </div>
        <Link href={`/payment/create`} className={`w-full md:w-fit`}>
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
            Create Payment
          </Button>
        </Link>
      </div>
      <div
        className={`bg-white rounded-2xl border border-gray-200 shadow-sm  flex flex-col divide-y`}
      >
        {/* Filter Status */}
        <div
          className={`px-6 flex items-center gap-6 transition-colors duration-300`}
        >
          <button
            onClick={() => {
              setFilter((prev) => ({ ...prev, status: "" }));
            }}
            className={` transition-colors duration-300 py-4 ${
              filter.status === ""
                ? "font-bold border-b-2 border-black "
                : "font-normal"
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setFilter((prev) => ({
                ...prev,
                status: EPaymentStatus.TRANSFER,
              }));
            }}
            className={` transition-colors duration-300  py-4 ${
              filter.status === EPaymentStatus.TRANSFER
                ? "font-bold border-b-2 text-success border-success"
                : "font-normal"
            }`}
          >
            Transfer
          </button>
          <button
            onClick={() => {
              setFilter((prev) => ({
                ...prev,
                status: EPaymentStatus.PAID,
              }));
            }}
            className={` transition-colors duration-300  py-4 ${
              filter.status === EPaymentStatus.PAID
                ? "font-bold border-b-2 text-warning border-warning "
                : "font-normal"
            }`}
          >
            Paid
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
            className={`border-2 border-secondaryText px-3 py-2 rounded-md w-full md:w-[300px] focus:outline-none focus:border-2 focus:border-primary focus:shadow-sm focus:shadow-yellow-200 active:border-2 active:border-primary `}
          >
            <option selected hidden value={``}>
              Select Month
            </option>
            <option value={``}>All Month</option>
            {Object.values(Month).map((rows) => (
              <option key={rows} value={rows}>
                {rows}
              </option>
            ))}
          </select>

          <Input
            placeholder={`Year`}
            type={`text`}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                setFilter((prev) => ({
                  ...prev,
                  year: Number(numberFormat(e.target.value)),
                }));
              }
            }}
            onBlur={(e) => {
              setFilter((prev) => ({
                ...prev,
                year: Number(numberFormat(e.target.value)),
              }));
            }}
            groupClassName="w-full"
          />

          <div
            className={`flex gap-2 items-center px-4 py-2 border-2 border-secondaryText  rounded-md w-full focus-within:border-primary focus-within:shadow-sm focus-within:shadow-yellow-200`}
          >
            <MagnifyingGlassIcon className={`text-gray-500 size-4`} />
            <input
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  setFilter((prev) => ({
                    ...prev,
                    keyword: e.target.value,
                  }));
                }
              }}
              placeholder={`Search...`}
              className={`focus:outline-none w-full`}
              type={`text`}
            />
          </div>
        </div>
        {/* Table */}

        <div className="relative overflow-x-auto z-10 ">
          <table className="w-full text-sm text-left rtl:text-right text-primaryText hidden md:table ">
            <thead className="text-xs text-[#1A1A1A] uppercase bg-accents bg-opacity-5 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Period
                </th>
                <th scope="col" className="px-6 py-3">
                  Paid Date
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
                    <td className="px-6 py-4 ">
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
                          <p>{rows.student.fullname}</p>
                          <p className={`text-gray-400`}></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      Rp{currencyFormat(rows.amount)}
                    </td>
                    <td className="px-6 py-4">
                      {rows.month} {rows.year}
                    </td>
                    <td className="px-6 py-4">{rows.paidDate.toString()}</td>
                    <td className="px-6 py-4">
                      <div
                        className={`bg-green-200 text-green-700 text-center px-3 py-1 rounded-full w-fit`}
                      >
                        {rows.status}
                      </div>
                    </td>
                    <td className="px-6 py-4   ">
                      <div className={`flex items-center divide-x`}>
                        <Link
                          href={`/payment/edit/${rows.id}`}
                          className={`flex items-center gap-2 pr-2 hover:text-primary`}
                        >
                          <PencilSquareIcon className={`size-6`} />
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedData(rows);
                            setConfirmDelete(true);
                          }}
                          className={`flex items-center gap-2 pl-2 hover:text-warning`}
                        >
                          <TrashIcon className={`size-6`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            )}
            <tbody className={`w-full`}>{}</tbody>
          </table>
          <div className={`flex flex-col gap-4 p-4`}>
            {loading ? (
              [0, 1, 2, 3].map((rows) => (
                <div
                  key={rows}
                  className={`flex md:hidden flex-col border border-secondaryText rounded-lg p-3 active:bg-bgPrimary`}
                >
                  <div className={`flex items-center justify-between`}>
                    <div className={`flex flex-col gap-4`}>
                      <div className={`flex items-start gap-4`}>
                        <div className={`flex flex-col`}>
                          <div
                            className={`w-11 h-11  bg-gray-500 animate-pulse text-white flex items-center justify-center rounded-[100%]`}
                          />
                        </div>
                        <div className={`flex flex-col`}>
                          <div
                            className={`h-4 w-[60px] bg-gray-500 animate-pulse rounded-lg`}
                          />
                          <p className={`text-gray-400`}></p>
                          <div
                            className={`h-4 w-[60px] bg-gray-500 animate-pulse rounded-lg mt-1 mb-2`}
                          />
                          <div
                            className={`h-4 w-[60px] bg-gray-500 animate-pulse rounded-lg`}
                          />
                        </div>
                      </div>
                    </div>
                    <ChevronRightIcon className={`size-6 shrink-0`} />
                  </div>
                </div>
              ))
            ) : error ? (
              <div
                className={`md:hidden w-full flex items-center text-primaryText font-bold text-2xl px-5 py-10`}
              >
                DATA NOT FOUND
              </div>
            ) : (
              data?.result.items.map((rows, index) => (
                <Link
                  key={index}
                  href={`/payment/edit/${rows.id}`}
                  className={`flex md:hidden flex-col border border-secondaryText rounded-lg p-3 active:bg-bgPrimary`}
                >
                  <div>
                    <div
                      className={`flex items-center justify-between w-full mb-3`}
                    >
                      <p className={`text-xs text-secondaryText`}>
                        {rows.paidDate.toString()}
                      </p>
                      <Chip
                        className={`text-xs`}
                        color={translateColor(rows.status)}
                      >
                        {rows.status}
                      </Chip>
                    </div>
                    <div className={`flex items-center w-full justify-between`}>
                      <div className={`flex flex-col gap-4`}>
                        <div className={`flex items-start gap-4`}>
                          <div className={`flex flex-col`}>
                            <div
                              className={`aspect-square w-10 h-10 shrink-0 text-xl bg-primaryText text-white flex items-center justify-center rounded-[100%]`}
                            >
                              {getInitialFromName(rows.student.fullname)}
                            </div>
                          </div>
                          <div className={`flex flex-col`}>
                            <p className={`text-lg font-medium`}>
                              {rows.student.name}
                            </p>
                            <p className={`text-secondaryText text-sm mb-2`}>
                              {rows.month} {rows.year}
                            </p>
                          </div>
                        </div>
                      </div>
                      <ChevronRightIcon className={`size-6 shrink-0`} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
        <div className={`flex w-full justify-end items-center py-3 gap-4 px-5`}>
          <button
            disabled={filter.page === 1}
            onClick={() => {
              setFilter((prev) => ({ ...prev, page: Number(prev.page)! - 1 }));
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
      <ConfirmationModals
        icons={<ExclamationTriangleIcon className={`size-32 text-primary`} />}
        title={"Are you sure?"}
        open={confirmDelete}
        onClose={function (): void {
          setConfirmDelete(false);
        }}
        onReject={() => {
          setConfirmDelete(false);
          setSelectedData(undefined);
        }}
        onApprove={() => {
          handleDeleteData();
        }}
        approveText={"Delete this data"}
      >
        Are you sure you want to delete the following payment data?
      </ConfirmationModals>
    </div>
  );
}
