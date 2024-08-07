"use client";
import { PostLogin } from "@/service/login";
import { FormProps } from "@/types/login";
import { localStorageMixins } from "@/utils/localStorage.mixins";
import { useRequest } from "ahooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState<FormProps>({
    email: "",
    password: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const { runAsync } = useRequest(PostLogin, { manual: true });
  const handleSubmit = () => {
    runAsync(loginForm).then((res) => {
      localStorageMixins.set("access_token", res.result.access_token);
      localStorageMixins.set("profile", res.result.profile);
      router.push(`/`);
    });
  };
  return (
    <div
      className={`w-screen h-screen flex items-center justify-center bg-white p-4 md:p-40`}
    >
      <div className={`md:w-[50%] hidden md:block`}>
        <Image
          className={`w-96 h-96`}
          alt={``}
          src={`/6491439.jpg`}
          width={1080}
          height={1080}
        />
      </div>
      <div className={`w-full md:w-[50%]`}>
        <form
          className={`flex flex-col max-w-[500px]`}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h1 className={`text-4xl font-bold mb-5`}>Login</h1>
          <input
            type={`text`}
            value={loginForm.email}
            onChange={(e) => {
              setLoginForm((prev) => ({ ...prev, email: e.target.value }));
            }}
            placeholder={`Email`}
            className={`border mb-3 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-gray-500`}
          />
          <div
            className={`flex items-center justify-between border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-gray-500`}
          >
            <input
              type={passwordVisibility ? "text" : "password"}
              value={loginForm.password}
              onChange={(e) => {
                setLoginForm((prev) => ({ ...prev, password: e.target.value }));
              }}
              placeholder={`Password`}
              className={` focus:outline-none`}
            />
            <button
              type={`button`}
              onClick={() => {
                setPasswordVisibility(!passwordVisibility);
              }}
            >
              {passwordVisibility ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            className={`mt-5 rounded-lg px-4 py-3 w-full bg-black text-white`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
