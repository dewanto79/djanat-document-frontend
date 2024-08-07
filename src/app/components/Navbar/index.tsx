import { Bars3Icon } from "@heroicons/react/16/solid";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

interface NavbarProps{
    setSidebar:()=>void;
}

export default function Navbar({setSidebar}:NavbarProps) {
  return (
    <div className={`flex items-center justify-between p-4`}>
      <button onClick={setSidebar} className={` border-gray-400 border`}>
        <Bars3Icon className={`fill-black size-10 p-1  `} />
      </button>
      <div>
        <div
          className={`w-11 h-11 rounded-full bg-slate-900 text-white  text-2xl flex items-center justify-center`}
        >
          JJ
        </div>
      </div>
    </div>
  );
}
