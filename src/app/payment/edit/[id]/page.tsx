"use client";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Button from "@/app/components/Button";
import FeedbackModals from "@/app/components/FeedbackModals";
import Input from "@/app/components/Input";
import {
  getPaymentDetail,
  getStudentPayment,
  patchPayment,
  postPayment,
} from "@/service/payment";
import { EPaymentStatus } from "@/types/payment/getPaymentList";
import { Month } from "@/types/month.enum";
import { GetStudentPaymentResponseProps } from "@/types/payment/student";
import { currencyFormat } from "@/utils";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useDebounce, useRequest } from "ahooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PatchPaymentPayload } from "@/types/payment/patchPayment";

export default function EditPayment({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [form, setForm] = useState<PatchPaymentPayload>({
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

  const { runAsync, loading, error } = useRequest(patchPayment, {
    manual: true,
    loadingDelay: 2000,
  });

  const {
    runAsync: fetchPayment,
    loading: searchLoading,
    error: fetchPaymentError,
  } = useRequest(getPaymentDetail, {
    manual: true,
  });

  const handleSubmit = () => {
    let submittedPayload = {
      ...form,
      studentId: selectedData.id,
      amount: Number(form.amount.toString().replaceAll(",", "")),
    };
    runAsync(params.id, submittedPayload)
      .then(() => {
        setModalSuccess(true);
      })
      .catch(() => {
        setModalFailed(true);
      });
  };

  useEffect(() => {
    fetchPayment(params.id).then((res) => {
      const { student, ...form } = res.result;
      setForm({
        ...form,
        year: form.year.toString(),
        paidDate: form.paidDate.toString(),
      });
      setSelectedData(student);
    });
  }, []);

  return (
    <main className={``}>
      <Breadcrumbs />
      <div className={`mt-4`}>
        <h1 className={`text-3xl font-bold`}>Edit Payment</h1>
        <p className={`mt-2 text-gray-400`}>Edit payment data of a student</p>
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
                      {Object.values(Month).map((rows, index) => (
                        <option
                          key={index}
                          disabled={selectedData?.payments?.some(
                            (rows2: any) => rows2 === rows
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
                    value={form.paidDate}
                  />
                  <div className={`flex flex-col`}>
                    <label htmlFor={`status`} className={`mb-2`}>
                      Status
                    </label>
                    <select
                      id={`status`}
                      onChange={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }));
                      }}
                      className={`px-4 py-3 border border-secondaryText rounded-lg`}
                      value={form.status}
                    >
                      {Object.values(EPaymentStatus).map((rows, index) => (
                        <option key={index} value={rows}>
                          {rows}
                        </option>
                      ))}
                    </select>
                  </div>
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
        Payment data has been edited Successfully
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
