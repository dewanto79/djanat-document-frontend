"use client";

import FeedbackModals from "@/app/components/FeedbackModals";
import Input from "@/app/components/Input";
import { getStudentDetail, postStudent, putStudent } from "@/service/student";
import { PutStudentRequestProps } from "@/types/putStudent";
import { EStudentStatus } from "@/types/student";
import { CameraIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useRequest } from "ahooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditStudent({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [form, setForm] = useState<PutStudentRequestProps>({
    fullname: "",
    name: "",
    address: "",
    startdate: "",
    birthdate: "",
    grade: "",
    parents: "",
    phone: "",
    status: EStudentStatus.ACTIVE,
  });

  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);

  const { runAsync, loading, error } = useRequest(putStudent, {
    manual: true,
  });
  const { runAsync: fetchStudentDetail, data } = useRequest(getStudentDetail, {
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
    fetchStudentDetail(params.id).then((res) => {
      setForm(res.result);
    });
  }, []);

  return (
    <main className={`px-10 py-6`}>
      <div className={``}>
        <h1 className={`text-3xl font-bold`}>Edit Student</h1>
        <p className={`mt-2 text-gray-400`}>Edit an existing student data</p>
      </div>
      <div className={`flex flex-col md:flex-row gap-4 rounded-2xl mt-8 `}>
        <div
          className={`w-full min-h-[250px] md:w-[25%] md:max-h-[300px] flex flex-col items-center justify-center rounded-lg border border-gray-300 shadow-sm px-6 py-4`}
        >
          <div className="aspect-square rounded-[100%] bg-gray-100 text-gray-500 p-6 flex flex-col shrink-0 items-center justify-center">
            <label
              htmlFor={`upload-image`}
              className={`flex items-center flex-col`}
            >
              <CameraIcon className={`size-8`} />
              <p>Upload Photo</p>
            </label>
          </div>
          <div className={`w-full flex items-center justify-between mt-6`}>
            <p>Status</p>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.status === EStudentStatus.ACTIVE}
                className="sr-only peer"
                onChange={(e) => {
                  if (e.target.checked) {
                    setForm((prev) => ({
                      ...prev,
                      status: EStudentStatus.ACTIVE,
                    }));
                  } else {
                    setForm((prev) => ({
                      ...prev,
                      status: EStudentStatus.INACTIVE,
                    }));
                  }
                }}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
        <input id={`upload-image`} type={`file`} hidden />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={`grid md:grid-cols-2 gap-4 rounded-2xl border border-gray-300 shadow-sm p-6 md:p-8 w-full`}
        >
          <Input
            required
            disabled={loading}
            value={form.fullname}
            onChange={(e) => {
              setForm({ ...form, fullname: e.target.value });
            }}
            label={`Full Name`}
          />
          <Input
            required
            disabled={loading}
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
            label={`Name`}
          />
          <Input
            required
            disabled={loading}
            value={form.grade}
            onChange={(e) => {
              setForm({ ...form, grade: e.target.value });
            }}
            label={`Grade`}
            type={`number`}
          />
          <Input
            required
            disabled={loading}
            value={form.parents}
            onChange={(e) => {
              setForm({ ...form, parents: e.target.value });
            }}
            label={`Parents`}
          />
          <Input
            required
            disabled={loading}
            value={form.phone}
            onChange={(e) => {
              setForm({ ...form, phone: e.target.value });
            }}
            label={`Phone Number`}
            type={`tel`}
          />
          <div className={"flex flex-col gap-3 md:col-span-2"}>
            <label className={``} htmlFor={"address"}>
              Address
            </label>
            <textarea
              required
              value={form.address}
              onChange={(e) => {
                setForm({ ...form, address: e.target.value });
              }}
              className={`h-[100px] px-4 py-2 rounded-md  focus:outline-none w-full resize-none border-2 border-gray-200 hover:outline-black focus-within:border-black`}
            />
          </div>
          <Input
            required
            disabled={loading}
            value={form.birthdate}
            onChange={(e) => {
              setForm({ ...form, birthdate: e.target.value });
            }}
            label={`Birthday`}
            type={`date`}
          />
          <Input
            required
            disabled={loading}
            value={form.startdate}
            onChange={(e) => {
              setForm({ ...form, startdate: e.target.value });
            }}
            label={`Start Date`}
            type={`date`}
          />
          <div
            className={`md:col-span-2 flex items-center justify-end w-full mt-1 `}
          >
            <button
              type={`submit`}
              disabled={loading}
              className={`px-5 py-2 bg-primaryText text-white rounded-lg md:w-fit w-full hover:bg-opacity-80 disabled:bg-opacity-20`}
            >
              Edit Data
            </button>
          </div>
        </form>
      </div>
      <FeedbackModals
        icons={<CheckCircleIcon className={`text-green-500 size-24`} />}
        title={"Success"}
        open={modalSuccess}
        onClose={function (): void {
          router.push(`/student`);
        }}
        actionText="Back to Homepage"
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
