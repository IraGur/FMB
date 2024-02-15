"use client";
import { Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";

export default function AddressList() {
   const [addresses, setAddresses] = useState(null);
   const [openModal, setOpenModal] = useState(false);

   const getAddresses = async () => {
      const res = await fetch("/api/addresses");
      const data = await res.json();
      setAddresses(data);
   };

   useEffect(() => {
      if (!addresses) {
         getAddresses();
      }
   }, [addresses]);

   return (
      <div className="flex  space-y-4">
         <div className="flex flex-col overflow-x-auto w-full">
            {" "}
            <Button
               className="mb-3 mt-3 w-3/5"
               onClick={() => setOpenModal(true)}
            >
               Add New Address
            </Button>
            <div className="border w-3/5 ">
               <Table hoverable>
                  <Table.Head>
                     <Table.HeadCell>Client name</Table.HeadCell>
                     <Table.HeadCell>Client address</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                     {addresses?.map((address, index) => (
                        <Table.Row
                           key={index}
                           className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-20"
                        >
                           <Table.Cell>{address.label}</Table.Cell>
                           <Table.Cell>{address.value}</Table.Cell>
                        </Table.Row>
                     ))}
                  </Table.Body>
               </Table>
               <AddressForm
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  setAddresses={setAddresses}
               />
            </div>
         </div>
      </div>
   );
}
