"use client";
import { Table } from "flowbite-react";
import { useEffect, useState, useContext } from "react";
import { CalendarContext } from "../context/calendarContext";
import tailwindConfig from "../../tailwind.config";

export default function UserList(props) {
   const [users, setUsers] = useState(null);
   const { setCalendarData } = useContext(CalendarContext);

   const getUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
   };

   const handleRowClick = (selectedUserId) => {
      const previouslySelectedUserId = props.selectedUserId;

      if (
         previouslySelectedUserId &&
         previouslySelectedUserId === selectedUserId
      ) {
         props.onRowClick(null);
      } else {
         props.onRowClick(selectedUserId);
      }

      setCalendarData(null);
   };

   useEffect(() => {
      if (!users) {
         getUsers();
      }
   }, []);

   return (
      <div className={`flex-col space-y-4 ${props.className || ""}`}>
         <div className="flex overflow-x-auto w-full ">
            <div className="border w-full ">
               <Table hoverable>
                  <Table.Head className="text-greyviolet2 text-lg dark:border-neutral-500">
                     <Table.HeadCell className="bg-slate-800">
                        Full name
                     </Table.HeadCell>
                     <Table.HeadCell className="bg-slate-800">
                        Role
                     </Table.HeadCell>
                     <Table.HeadCell className="bg-slate-800">
                        Email
                     </Table.HeadCell>
                     <Table.HeadCell className="bg-slate-800">
                        Status
                     </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                     {users
                        ?.filter((user) => !user.isHR)
                        .map((user, index) => (
                           <Table.Row
                              onClick={() => handleRowClick(user._id)}
                              key={index}
                              className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-greyvioletl  dark:hover:bg-gray-20"
                           >
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                 {`${user.firstName} ${user.lastName}`}
                              </Table.Cell>
                              <Table.Cell>{user.role}</Table.Cell>
                              <Table.Cell>{user.email}</Table.Cell>
                              <Table.Cell>
                                 {user.isEligible ? "Yeeeeah" : "Noooooo!!!"}
                              </Table.Cell>
                           </Table.Row>
                        ))}
                  </Table.Body>
               </Table>
            </div>
         </div>
      </div>
   );
}
