"use client";
import { PostLogin, PostLoginGoogle } from "@/service/login";
import { FormProps } from "@/types/login";
import { localStorageMixins } from "@/utils/localStorage.mixins";
import { useRequest } from "ahooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useGoogleLogin } from "@react-oauth/google";
import FeedbackModals from "../components/FeedbackModals";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function Login() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState<FormProps>({
    email: "",
    password: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<any>(null);
  const [failedModal, setFailedModal] = useState<boolean>(false);
  const { runAsync, error, loading } = useRequest(PostLogin, { manual: true });
  const handleSubmit = () => {
    runAsync(loginForm).then((res) => {
      localStorageMixins.set("access_token", res.result.access_token);
      localStorageMixins.set("profile", res.result.profile);
      router.push(`/`);
    });
  };

  const {
    data: googleRes,
    runAsync: postLoginGoogle,
    error: errorGoogle,
    loading: loadingGoogle,
  } = useRequest(PostLoginGoogle, { manual: true });

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      onSuccessGoogleLogin(tokenResponse);
    },
    onError: (err) => {
      console.log(err);
    },
    onNonOAuthError: (err) => {
      console.log(err);
    },
  });

  const onSuccessGoogleLogin = async (googleResponse: any) => {
    try {
      // code request to backend
      const tokenGoogle = googleResponse?.access_token;
      postLoginGoogle({ token: tokenGoogle })
        .then((res) => {
          localStorageMixins.set("access_token", res.result.access_token);
          localStorageMixins.set("profile", res.result.profile);
          setAccessToken(res.result.access_token);
        })
        .catch((error) => {
          console.log(error);
          setFailedModal(true);
        });
    } catch (error) {
      // catch some error
    }
  };

  useEffect(() => {
    setAccessToken(localStorageMixins.get("access_token"));
    // protects when from the dashboard returns to the login page
    accessToken ? router.push("/") : router.push("/login");
  }, [accessToken]);
  return (
    <div
      className={`w-screen h-screen flex items-center justify-center gap-10 bg-bgPrimary p-4 md:p-40`}
    >
      <div className={`md:w-[50%] hidden md:block`}>
        <Image
          className={`w-full max-w-96 object-cover`}
          alt={``}
          src={`/6491439.jpg`}
          width={1080}
          height={1080}
        />
      </div>
      <div className={`w-full md:w-[50%]`}>
        {/* <form
          className={`flex flex-col max-w-[500px]`}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h1 className={`text-4xl font-bold mb-5`}>Login</h1>
          <input
            required
            disabled={loading}
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
              required
              disabled={loading}
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
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
          {error && (
            <p className={`text-warning mt-4`}>Invalid Email/Password</p>
          )}
          <button
            disabled={loading}
            className={`mt-5 rounded-lg px-4 py-3 w-full bg-primaryText text-white disabled:bg-secondaryText`}
          >
            Login
          </button>
        </form> */}
        <div className={`flex items-center justify-center`}>
          <Image
            className={`size-20 `}
            alt={``}
            src={`/logo.png`}
            width={300}
            height={300}
          />
        </div>
        <div className={`mb-6`}>
          <h1 className={`text-4xl font-bold text-primaryText  `}>
            Log in to Djanat Document
          </h1>
          <p className={`text-secondaryText mt-3`}>
            Welcome to Djanat Document Management System. Log in can only be
            done by using registered Google Email.
          </p>
        </div>
        <Button
          onClick={() => {
            googleLogin();
          }}
          className={`font-semibold !px-5 py-3 gap-3 rounded-full `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 326667 333333"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision"
            image-rendering="optimizeQuality"
            fill-rule="evenodd"
            clip-rule="evenodd"
            className={`size-6`}
          >
            <path
              d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
              fill="#4285f4"
            />
            <path
              d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
              fill="#34a853"
            />
            <path
              d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
              fill="#fbbc04"
            />
            <path
              d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
              fill="#ea4335"
            />
          </svg>
          Log in with Google Account
        </Button>
      </div>
      <FeedbackModals
        icons={<XCircleIcon className={`size-20 text-warning`} />}
        title={"Failed to Login"}
        open={failedModal}
        onClose={function (): void {
          setFailedModal(false);
        }}
        onAction={function (): void {
          setFailedModal(false);
        }}
        actionText="Try again"
      >
        <p className={`text-warning`}>{errorGoogle?.message}</p>
      </FeedbackModals>
    </div>
  );
}
