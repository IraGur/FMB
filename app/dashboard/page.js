"use client";

import { Sidebar } from "flowbite-react";
import UserCalendar from "../components/UserCalendar";
import UserList from "../components/UsersList";
import AddressList from "../components/AddressList";
import { useState } from "react";
import "../globals.css";

export default function Dashboard() {
   const [selectedMenuItem, setSelectedMenuItem] = useState("Employees");
   const [selectedUserId, setSelectedUserId] = useState(null);

   const onSidebarItemSelect = (e) => {
      setSelectedMenuItem(e.target.innerText);
   };

   return (
      <div className="flex h-full border  mt-7">
         <Sidebar aria-label="Default sidebar example">
            <Sidebar.Items>
               <Sidebar.ItemGroup>
                  <Sidebar.Item
                     className="hover:bg-greyvioletl"
                     href="#"
                     onClick={onSidebarItemSelect}
                  >
                     Employees
                  </Sidebar.Item>
                  <Sidebar.Item
                     className="hover:bg-greyvioletl"
                     href="#"
                     onClick={onSidebarItemSelect}
                  >
                     Addresses
                  </Sidebar.Item>
               </Sidebar.ItemGroup>
            </Sidebar.Items>
         </Sidebar>
         <div className="w-full ">
            {selectedMenuItem === "Employees" ? (
               <div className="flex w-full ">
                  <UserList
                     className="grow"
                     selectedUserId={selectedUserId}
                     onRowClick={setSelectedUserId}
                  />
                  {selectedUserId && (
                     <UserCalendar
                        className="flex-[0_0_500px]"
                        userId={selectedUserId}
                        height="501px"
                     />
                  )}
               </div>
            ) : (
               <AddressList />
            )}
         </div>
      </div>
   );
}
