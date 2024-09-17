"use client";

import Breadcrumbs from "@/app/components/Breadcrumbs";
import Button from "@/app/components/Button";
import FeedbackModals from "@/app/components/FeedbackModals";
import Input from "@/app/components/Input";
import { getExpenseDetail, patchExpense } from "@/service/expense";
import { PatchExpensePayload } from "@/types/expense/patchExpense";
import { Month } from "@/types/month.enum";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useRequest } from "ahooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditExpense({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [form, setForm] = useState<PatchExpensePayload>({
    description: "",
    amount: 0,
    month: "",
    year: 2024,
    expenseDate: "",
  });

  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);

  const { runAsync, loading, error } = useRequest(patchExpense, {
    manual: true,
  });
  const { runAsync: fetchExpenseDetail, data } = useRequest(getExpenseDetail, {
    manual: true,
  });

  const handleSubmit = () => {
    runAsync(params.id, form)
      .then(() => {
        setModalSuccess(true);
      })
      .catch(() => {
        setModalFailed(true);
      });
  };

  useEffect(() => {
    fetchExpenseDetail(params.id).then((res) => {
      setForm(res.result);
    });
  }, []);

  return (
    <main className={``}>
      <Breadcrumbs />
      <div className={`mt-4`}>
        <h1 className={`text-3xl font-bold`}>Edit Expense</h1>
        <p className={`mt-2 text-gray-400`}>Edit an existing expense data</p>
      </div>
      <div className={`flex flex-col md:flex-row gap-4 rounded-2xl mt-8 `}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={`grid md:grid-cols-2 gap-4 rounded-2xl border border-gray-300 shadow-sm px-5 py-4 w-full`}
        >
          <Input
            required
            disabled={loading}
            value={form.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
            }}
            label={`Description`}
          />
          <Input
            required
            disabled={loading}
            value={form.amount}
            onChange={(e) => {
              setForm({ ...form, amount: Number(e.target.value) });
            }}
            label={`Amount`}
          />
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
                Select Month
              </option>
              {Object.values(Month).map((rows, index) => (
                <option
                  className={`disabled:text-secondaryText`}
                  key={index}
                  value={rows}
                  selected={rows === form.month}
                >
                  {rows}
                </option>
              ))}
            </select>
          </div>
          <Input
            required
            disabled={loading}
            value={form.year}
            onChange={(e) => {
              setForm({ ...form, year: Number(e.target.value) });
            }}
            label={`Year`}
            type={`number`}
          />
          <Input
            required
            disabled={loading}
            value={form.expenseDate}
            onChange={(e) => {
              setForm({ ...form, expenseDate: e.target.value });
            }}
            label={`Expense Date`}
            type={`date`}
          />
          <div className={`md:col-span-2 flex justify-end w-full mt-4 `}>
            <Button
              type={`submit`}
              disabled={loading}
              className={`px-5 py-2 font-medium rounded-lg md:w-fit w-full hover:bg-opacity-80 disabled:bg-opacity-20`}
            >
              Edit Expense
            </Button>
          </div>
        </form>
      </div>
      <FeedbackModals
        icons={<CheckCircleIcon className={`text-green-500 size-24`} />}
        title={"Success"}
        open={modalSuccess}
        onClose={function (): void {
          router.push(`/expense`);
        }}
        actionText="Back to Homepage"
        onAction={() => {
          router.push(`/expense`);
        }}
      >
        Data has been edited and saved to the database.
      </FeedbackModals>
      <FeedbackModals
        icons={<XCircleIcon className={`text-red-500 size-24`} />}
        title={"Failed"}
        open={modalFailed}
        onClose={function (): void {
          setModalFailed(false);
        }}
        onAction={() => {
          setModalFailed(false);
        }}
        actionText="Try Again"
      >
        {error?.message}
      </FeedbackModals>
    </main>
  );
}
