"use client";
import Link from "next/link";
import { Button } from "flowbite-react";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useRouter, usePathname } from "next/navigation";
import { CalendarContext } from "../context/calendarContext";

export default function Header() {
   const router = useRouter();
   const pathname = usePathname();

   const { setUser } = useContext(UserContext);
   const { setCalendarData } = useContext(CalendarContext);

   const logout = () => {
      // Clear user data from context and session storage
      localStorage.removeItem("user");
      setUser(null);
      router.push("/");
   };

   useEffect(() => {
      setCalendarData(null);
   }, [pathname]);

   return (
      <div className="flex">
         <div className="grow">
            {/* <Link href={"/"}>Home</Link>
            <Link href={"/dashboard"}>Dashboard</Link>
            <Link href={"/calendar"}>Calendar</Link> */}
         </div>
         <div>
            <Button
               className="bg-greyviolet hover:bg-greyviolet2"
               onClick={logout}
            >
               Logout
            </Button>
         </div>
      </div>
   );
}
