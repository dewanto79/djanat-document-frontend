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
      name: "Payment",
      url: "/payment",
      icon: <BanknotesIcon className={` size-6`} />,
    },
    {
      level: 0,
      name: "Student",
      url: "/student",
      icon: <UserIcon className={`size-6`} />,
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
          className={`bg-bgPrimary text-primaryText h-full w-[280px]  px-5 py-6 z-50`}
        >
          <div className={`flex justify-between`}>
            <div className={`flex items-center`}>
              <Image
                className={`w-20`}
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
          <div className={`mt-4 md:mt-4 px-3`}>Menu</div>
          <div className={`flex flex-col  mt-3`}>
            {listMenu.map((rows, index) => (
              <Link
                key={index}
                className={`flex items-center gap-4   px-3 py-3 ${
                  path === rows.url
                    ? "bg-yellow-100 bg-opacity-50  text-[#d58b0a]"
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
      </div>
      <div className={`w-full`}>
        {/* Navbar */}
        <div
          className={`sticky top-0 flex gap-4 justify-between w-full bg-bgPrimary  px-5 py-3 md:py-5 z-40`}
        >
          <button
            onClick={() => {
              setSidebar(true);
            }}
            className={`shrink-0 active:text-opacity-80 md:hidden`}
          >
            <Bars3Icon className={`text-primaryText size-6 shrink-0`} />
          </button>
          <div
            className={`px-3 py-2 max-w-[500px] rounded-lg border border-gray-300 w-full items-center gap-3 flex`}
          >
            <MagnifyingGlassIcon className={`text-gray-500 size-5 shrink-0`} />
            <input
              placeholder={`Search`}
              type={`text`}
              className={`w-full focus:outline-none`}
            />
          </div>
          <div
            ref={ref}
            onClick={() => {
              setMenu(!menu);
            }}
            className={` relative flex items-center justify-end gap-2 cursor-pointer`}
          >
            <div className={`font-montserrat text-end hidden md:block`}>
              <div className={`font-medium text-sm`}>Jerrie Jayadi</div>
              <div className={`text-xs text-gray-500`}>admin</div>
            </div>
            <div
              className={`w-11 h-11 rounded-full bg-slate-900 text-white  text-2xl flex items-center justify-center`}
            >
              JJ
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
        <div className={`bg-white min-h-screen text-primaryText`}>
          {children}
        </div>
      </div>
    </div>
  );
}
