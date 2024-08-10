"use client";

import Button from "@/app/components/Button";
import FeedbackModals from "@/app/components/FeedbackModals";
import Input from "@/app/components/Input";
import { postStudent } from "@/service/student";
import { PostStudentRequestProps } from "@/types/postStudent";
import { CameraIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useRequest } from "ahooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateStudent() {
  const router = useRouter();
  const [form, setForm] = useState<PostStudentRequestProps>({
    fullname: "",
    name: "",
    address: "",
    startdate: "",
    birthdate: "",
    grade: "",
    parents: "",
    phone: "",
    gender: "",
  });

  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);

  const { runAsync, loading, error } = useRequest(postStudent, {
    manual: true,
  });

  const handleSubmit = () => {
    runAsync(form)
      .then(() => {
        setModalSuccess(true);
      })
      .catch(() => {
        setModalFailed(true);
      });
  };

  return (
    <main className={``}>
      <div className={``}>
        <h1 className={`text-3xl font-bold`}>Create Student</h1>
        <p className={`mt-2 text-gray-400`}>Create a new student data</p>
      </div>
      <div className={`flex flex-col md:flex-row gap-4 rounded-2xl mt-8 `}>
        <label
          htmlFor={`upload-image`}
          className={`w-full min-h-[250px] md:w-[25%] md:max-h-[300px] flex flex-col items-center justify-center rounded-lg border border-gray-300 shadow-sm px-5 py-4`}
        >
          <div className="w-40 h-40 rounded-[100%] bg-gray-100 text-gray-500 p-5 flex flex-col shrink-0 items-center justify-center">
            <CameraIcon className={`size-8`} />
            <p>Upload Photo</p>
          </div>
        </label>
        <input id={`upload-image`} type={`file`} hidden />
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
          <div className={`flex flex-col gap-2`}>
            <label>Gender</label>
            <select
              onChange={(e) => {
                setForm((prev) => ({ ...prev, gender: e.target.value }));
              }}
              className={`px-4 py-2 w-full rounded-md  border-2 border-secondaryText`}
            >
              <option value={``} hidden selected disabled>
                Select Gender
              </option>
              <option value={`L`}>Laki-Laki</option>
              <option value={`P`}>Perempuan</option>
            </select>
          </div>
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
          <div className={`md:col-span-2 flex justify-end w-full mt-4 `}>
            <Button
              type={`submit`}
              disabled={loading}
              className={`px-5 py-2 font-medium rounded-lg md:w-fit w-full hover:bg-opacity-80 disabled:bg-opacity-20`}
            >
              Create User
            </Button>
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
        onAction={() => {
          router.push(`/student`);
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
      >
        {error?.message}
      </FeedbackModals>
    </main>
  );
}
