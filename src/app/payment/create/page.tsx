"use client";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Button from "@/app/components/Button";
import FeedbackModals from "@/app/components/FeedbackModals";
import Input from "@/app/components/Input";
import { getStudentPayment, postPayment } from "@/service/payment";
import { getStudentList, postStudent } from "@/service/student";
import { Month, PostPaymentPayload } from "@/types/payment/postPayment";
import { GetStudentPaymentResponseProps } from "@/types/payment/student";
import { PostStudentRequestProps } from "@/types/postStudent";
import { GetStudentProps, StudentListProps } from "@/types/student";
import { currencyFormat } from "@/utils";
import {
  CameraIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useDebounce, useRequest } from "ahooks";
import { error } from "console";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreatePayment() {
  const router = useRouter();
  const path = usePathname()
    .split(`/`)
    .map(
      (rows) => rows.charAt(0).toUpperCase() + rows.substring(1).toLowerCase()
    );
  const [form, setForm] = useState<PostPaymentPayload>({
    amount: 0,
    month: "",
    year: "2024",
    paidDate: "",
    status: "PAID",
    studentId: "",
  });

  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const searchDelay = useDebounce(search, { wait: 1000 });
  const [manualLoading, setManualLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState<GetStudentPaymentResponseProps>();
  const [selectedData, setSelectedData] = useState<any>();

  const { runAsync, loading, error } = useRequest(postPayment, {
    manual: true,
    loadingDelay: 2000,
  });

  const {
    runAsync: searchStudents,
    loading: searchLoading,
    error: studentError,
  } = useRequest(getStudentPayment, {
    manual: true,
  });

  const handleSubmit = () => {
    let submittedPayload = {
      ...form,
      studentId: selectedData.id,
      amount: Number(form.amount.toString().replaceAll(",", "")),
    };
    runAsync(submittedPayload)
      .then(() => {
        setModalSuccess(true);
      })
      .catch(() => {
        setModalFailed(true);
      });
  };

  useEffect(() => {
    searchStudents({ keyword: searchDelay })
      .then((res) => {
        setManualLoading(false);
        setData(res);
      })
      .catch(() => {
        setManualLoading(false);
      });
  }, [searchDelay]);

  useEffect(() => {
    console.log(selectedData);
  }, [selectedData]);
  return (
    <main className={``}>
      <Breadcrumbs />

      <div className={`mt-4`}>
        <h1 className={`text-3xl font-bold flex items-center`}>
          Create Payment
        </h1>
        <p className={`mt-2 text-gray-400`}>Create payment data of a student</p>
      </div>
      <div className={`flex flex-col  gap-4 rounded-2xl mt-8 bg-white `}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={`flex flex-col  gap-6 rounded-2xl border  border-secondaryText shadow-sm px-5 py-6 w-full`}
        >
          <div className={`flex flex-col md:flex-row gap-6 md:divide-x`}>
            <div className={`flex flex-col w-full gap-6`}>
              <div className={`w-full`}>
                <h2
                  className={`text-lg font-semibold text-center md:text-left`}
                >
                  Search Student
                </h2>
                <div className={`relative md:col-span-2 mt-3 `}>
                  <Input
                    onFocus={() => {
                      setShow(true);
                    }}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setManualLoading(true);
                      setShow(true);
                    }}
                    placeholder={`Dewanto Surya Setyoadji`}
                  />
                  {manualLoading ? (
                    <div
                      className={`absolute top-full flex flex-col divide-y bg-white border border-secondaryText w-full px-3 py-2`}
                    >
                      Searching...
                    </div>
                  ) : (
                    show &&
                    search.length > 0 &&
                    (studentError ? (
                      <div
                        className={`absolute top-full flex flex-col divide-y bg-white border border-secondaryText w-full px-3 py-2`}
                      >
                        <div>Not Found</div>
                      </div>
                    ) : (
                      <div
                        className={`max-h-[200px] overflow-auto absolute top-full flex flex-col divide-y bg-white border border-secondaryText w-full px-3 py-2`}
                      >
                        {data?.result.items.map((rows, index) => (
                          <div
                            onClick={(e) => {
                              setSelectedData(rows);
                              setForm((prev) => ({
                                ...prev,
                                studentId: rows.id,
                              }));
                              setShow(false);
                            }}
                            className={`py-3 hover:cursor-pointer hover:bg-bgPrimary`}
                            key={index}
                          >
                            {rows.fullname}
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className={``}>
                <h2
                  className={`text-lg font-semibold text-center md:text-left`}
                >
                  Student Information
                </h2>
                <div className={`mt-3`}>
                  {selectedData ? (
                    <>
                      <div className={`flex flex-col gap-4`}>
                        <div>
                          <p className={`text-base text-primaryText mb-1`}>
                            Fullname
                          </p>
                          <p
                            className={`px-3 py-2 rounded-lg border border-secondaryText`}
                          >
                            {selectedData?.fullname ?? ""}
                          </p>
                        </div>
                        <div>
                          <p className={`text-base text-primaryText mb-1`}>
                            Grade
                          </p>
                          <p
                            className={`px-3 py-2 rounded-lg border border-secondaryText`}
                          >
                            {selectedData?.grade ?? ""}
                          </p>
                        </div>
                        {/* <div>
                          <p className={`text-base text-primaryText mb-1`}>
                            Parents
                          </p>
                          <p
                            className={`px-3 py-2 rounded-lg border border-secondaryText`}
                          >
                            {selectedData?.parents ?? ""}
                          </p>
                        </div>
                        <div>
                          <p className={`text-base text-primaryText mb-1`}>
                            Phone
                          </p>
                          <p
                            className={`px-3 py-2 rounded-lg border border-secondaryText`}
                          >
                            {selectedData?.phone ?? ""}
                          </p>
                        </div> */}
                      </div>
                    </>
                  ) : (
                    <div className={`text-secondaryText text-center`}>
                      -Select a student data first-
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Information */}

            <div className={`w-full md:px-6`}>
              <h2 className={`text-lg font-semibold text-center md:text-left `}>
                Payment Information
              </h2>
              {selectedData ? (
                <div className={`flex flex-col gap-4 mt-3`}>
                  <div className={`flex flex-col`}>
                    <label htmlFor={`month`} className={`mb-2`}>
                      Month
                    </label>
                    <select
                      id={`month`}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, month: e.target.value }));
                      }}
                      className={`px-4 py-3 border border-secondaryText rounded-lg`}
                    >
                      <option value={``} hidden selected>
                        Select Paid Month
                      </option>
                      {Object.values(Month).map((rows, index) => (
                        <option
                          className={`disabled:text-secondaryText`}
                          key={index}
                          disabled={selectedData?.payments?.some(
                            (rows2: any) =>
                              rows2.month === rows && rows2.year === Number(form.year)
                          )}
                          value={rows}
                        >
                          {rows}
                          {selectedData?.payments?.some(
                            (rows2: any) => rows2 === rows
                          ) && "PAID"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, year: e.target.value }));
                    }}
                    placeholder={`2024`}
                    label={`Year`}
                    type={`number`}
                    value={form.year}
                  />
                  <Input
                    onChange={(e) => {
                      setForm((prev) => ({
                        ...prev,
                        amount: currencyFormat(e.target.value),
                      }));
                    }}
                    placeholder={`250,000`}
                    value={form.amount}
                    label={`Amount`}
                  />
                  <Input
                    onChange={(e) => {
                      setForm((prev) => ({
                        ...prev,
                        paidDate: e.target.value,
                      }));
                    }}
                    label={`Paid Date`}
                    type={`date`}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
              ) : (
                <p className={`mt-6 text-center text-secondaryText`}>
                  Select a student data first
                </p>
              )}
            </div>
          </div>

          <div className={`md:col-span-2 flex justify-end w-full`}>
            <Button
              className={`justify-center font-medium`}
              type={`submit`}
              disabled={loading}
            >
              Add Payment
            </Button>
          </div>
        </form>
      </div>
      <FeedbackModals
        icons={<CheckCircleIcon className={`text-green-500 size-24`} />}
        title={"Success"}
        open={modalSuccess}
        onClose={function (): void {
          router.push(`/payment`);
        }}
        actionText="Back to Homepage"
        onAction={() => {
          router.push(`/payment`);
        }}
      >
        New Student data has been added to the database
      </FeedbackModals>
      <FeedbackModals
        icons={<XCircleIcon className={`text-red-500 size-24`} />}
        title={"Failed"}
        open={modalFailed}
        onClose={function (): void {
          setModalFailed(false);
        }}
        actionText="Try Again"
        onAction={() => {
          setModalFailed(false);
        }}
      >
        {error?.message}
      </FeedbackModals>
    </main>
  );
}
