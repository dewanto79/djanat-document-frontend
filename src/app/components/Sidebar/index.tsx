import { getInitialFromName } from "@/utils";
import { localStorageMixins } from "@/utils/localStorage.mixins";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  BanknotesIcon,
  Bars3Icon,
  ChartBarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";

interface SideBarProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Sidebar({ children, className }: SideBarProps) {
  const [menu, setMenu] = useState<boolean>(false);
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>();
  const ref = useRef<any>(null);
  const path = usePathname();

  const listMenu = [
    {
      level: 0,
      name: "Dashboard",
      url: "/",
      icon: <HomeIcon className={`size-6`} />,
    },
    {
      level: 0,
      name: "Student",
      url: "/student",
      icon: <UserIcon className={`size-6 `} />,
    },
    {
      level: 0,
      name: "Payment",
      url: "/payment",
      icon: (
        <BanknotesIcon
          className={` size-6 ${path === "/payment" && `text-primary`}`}
        />
      ),
    },
  ];

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target)) {
        setMenu(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const handleLogout = () => {
    localStorageMixins.remove("access_token");
    window.open("/");
  };

  useEffect(() => {
    setProfile(JSON.parse(localStorageMixins.get(`profile`)!));
  }, []);
  return (
    <div className={`flex w-full z-50`}>
      <div
        onClick={() => {
          setSidebar(false);
        }}
        className={`${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } w-full fixed md:sticky top-0 md:flex md:translate-x-0 md:w-[280px] left-0 h-screen  z-50 backdrop-blur-sm transition-all duration-300`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`bg-white text-primaryText h-full w-[280px]  px-5 py-6 z-50 flex flex-col justify-between`}
        >
          <div className={``}>
            <div className={`flex justify-between`}>
              <div className={`flex items-center justify-center w-full`}>
                <Image
                  className={`w-20 md:w-32`}
                  alt={``}
                  src={`/logo.png`}
                  width={300}
                  height={300}
                />
              </div>
              <button
                onClick={() => {
                  setSidebar(false);
                }}
                className={`md:hidden `}
              >
                <ArrowLeftIcon className={`size-6 `} />
              </button>
            </div>
            <div className={`px-3 mt-4 md:mt-6 bg-primary py-3  rounded-lg`}>
              <div
                ref={ref}
                onClick={() => {
                  setMenu(!menu);
                }}
                className={` relative flex items-center justify-start gap-2 cursor-pointer`}
              >
                <div
                  className={`w-11 h-11 rounded-full bg-slate-900 text-white  text-2xl flex items-center justify-center`}
                >
                  {getInitialFromName(profile?.name ?? "")}
                </div>
                <div className={`font-montserrat text-start `}>
                  <div className={`font-semibold text-base text-primaryText`}>
                    {profile?.name ?? ""}
                  </div>
                  <div className={`text-xs text-primaryText`}>
                    {profile?.roles[0] ?? ""}
                  </div>
                </div>
              </div>
            </div>
            <div className={`mt-4 md:mt-6 px-3`}>Menu</div>
            <div className={`flex flex-col  mt-3`}>
              {listMenu.map((rows, index) => (
                <Link
                  onClick={() => {
                    setSidebar(false);
                  }}
                  key={index}
                  className={`flex items-center gap-4   px-3 py-3 ${
                    path === rows.url
                      ? "bg-[#fff8ee] text-primary font-semibold"
                      : "hover:bg-gray-500 hover:bg-opacity-5"
                  } transition-colors duration-200`}
                  href={rows.url}
                >
                  {rows.icon}
                  {rows.name}
                </Link>
              ))}
            </div>
          </div>
          <div
            ref={ref}
            onClick={() => {
              handleLogout();
            }}
            className={` relative md:flex items-center justify-start gap-2 cursor-pointer p-3 font-semibold text-warning hover:opacity-80  hidden`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-warning"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </div>
        </div>
      </div>
      <div className={`w-full`}>
        {/* Navbar */}
        <div
          className={`sticky top-0 flex gap-4 justify-between w-full bg-white  px-5 py-3 md:py-5 z-40 md:hidden`}
        >
          <button
            onClick={() => {
              setSidebar(true);
            }}
            className={`shrink-0 active:text-opacity-80 md:hidden`}
          >
            <Bars3Icon className={`text-primaryText size-6 shrink-0`} />
          </button>
          <div />
          <div
            ref={ref}
            onClick={() => {
              setMenu(!menu);
            }}
            className={` relative flex items-center justify-end gap-2 cursor-pointer`}
          >
            <div className={`font-montserrat text-end hidden md:block`}>
              <div className={`font-medium text-sm`}>{profile?.name ?? ""}</div>
              <div className={`text-xs text-gray-500`}>
                {profile?.roles[0] ?? ""}
              </div>
            </div>
            <div
              className={`w-11 h-11 rounded-full bg-slate-900 text-white  text-2xl flex items-center justify-center`}
            >
              {getInitialFromName(profile?.name)}
            </div>

            <div>
              {menu ? (
                <ChevronUpIcon className={`text-primaryText size-5`} />
              ) : (
                <ChevronDownIcon className={`text-primaryText size-5`} />
              )}
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`${
                menu ? "flex" : "hidden"
              } absolute top-[65px] divide-y-2 flex flex-col bg-white border border-gray-700 border-opacity-20 shadow-lg drop-shadow-lg px-6 py-3 w-60 cursor-default`}
            >
              {/* <button
                  onClick={() => {
                    router.push(`/profile`);
                  }}
                  className={`w-full text-left active:text-primary md:hover:text-primary py-4`}
                >
                  Profile
                </button> */}
              <button
                onClick={() => {
                  handleLogout();
                }}
                className={`w-full text-left active:text-primary md:hover:text-primary py-4`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div
          className={`bg-bgPrimary min-h-screen text-primaryText p-4 pb-28  md:p-10`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
