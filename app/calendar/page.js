"use client";
import UserCalendar from "../components/UserCalendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { CalendarContext } from "../context/calendarContext";
import { Dropdown, Modal, Button } from "flowbite-react";
import { getDistance } from "geolib";

export default function CalendarPage() {
   const { user } = useContext(UserContext);

   const [showModal, setShowModal] = useState(false);
   const [selectedDate, setSelectedDate] = useState(null);
   const [clientAddresses, setClientAddresses] = useState(null);
   const [isUserEligible, setIsUserEligible] = useState(
      user?.isEligible || false
   );
   const { calendarData, setCalendarData } = useContext(CalendarContext);

   const getClientAddresses = async () => {
      try {
         const res = await fetch("/api/addresses", {
            headers: {
               "Content-Type": "application/json",
            },
         });

         const resData = await res.json();
         setClientAddresses(resData);
      } catch (error) {
         console.error("Error updating calendar data", error);
      }
   };

   const getMaxWorkedAt = (array) => {
      console.log(array);
      const occurrenceMap = array.reduce(
         (acc, { workplaceLabel }) => ({
            ...acc,
            [workplaceLabel]: (acc[workplaceLabel] || 0) + 1,
         }),
         {}
      );

      const maxOccurringLabel = Object.keys(occurrenceMap).reduce((a, b) =>
         occurrenceMap[b] > occurrenceMap[a] ? b : a
      );

      return array.find(
         ({ workplaceLabel }) => workplaceLabel === maxOccurringLabel
      );
   };

   const checkIfEligible = () => {
      let isEligible = false;

      const userHomeAddress = user.addresses.find((a) => a.label === "Home");
      const userOfficeAddress = user.addresses.find(
         (a) => a.label === "Office"
      );
      const mostWorkedAt = getMaxWorkedAt(calendarData);

      console.log(mostWorkedAt.workplaceLabel);

      if (mostWorkedAt.workplaceLabel !== "Home") {
         if (mostWorkedAt.workplaceLabel === "Office") {
            const homeToOfficeDistance = getDistance(
               { lat: userHomeAddress.lat, lng: userHomeAddress.lng },
               { lat: userOfficeAddress.lat, lng: userOfficeAddress.lng }
            );

            console.log(
               "distance beetwen home and office is",
               homeToOfficeDistance
            );

            isEligible = homeToOfficeDistance <= 10000;
         } else {
            const clientAddtess = clientAddresses.find(
               (a) => a._id === mostWorkedAt.addressId
            );

            const homeToClientDistance = getDistance(
               { lat: userHomeAddress.lat, lng: userHomeAddress.lng },
               { lat: clientAddtess.lat, lng: clientAddtess.lng }
            );

            console.log(
               "distance beetwen home and client is",
               homeToClientDistance
            );

            isEligible = homeToClientDistance <= 10000;
         }
      }
      setIsUserEligible(isEligible);
   };

   const handleDateClick = (info) => {
      setShowModal(true);
      setSelectedDate(info.dateStr);
   };

   const handleAddressClick = async (address) => {
      const isClient = address.label !== "Home" && address.label !== "Office";

      const convertLabelToClassName = (label) =>
         label.replaceAll(" ", "-").toLowerCase();

      setShowModal(false);

      try {
         const res = await fetch("/api/calendar", {
            method: "POST",
            body: JSON.stringify({
               addressId: address._id,
               date: selectedDate,
               highlightClass: isClient
                  ? "client"
                  : convertLabelToClassName(address.label),
               color: address.color, // Include color information
               userId: user._id,
               workplaceLabel: address.label,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         });

         await res.json();

         if (calendarData?.length) {
            checkIfEligible();
         }

         setTimeout(() => {
            setCalendarData(null);
         });
      } catch (error) {
         console.error("Error updating calendar data", error);
      }
   };

   const closeModal = () => {
      setShowModal(false);
      setSelectedDate(null);
   };

   const updateUserEligibility = async () => {
      try {
         const res = await fetch("/api/users", {
            method: "PUT",
            body: JSON.stringify({
               userId: user._id,
               isEligible: isUserEligible,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         });

         await res.json();
      } catch (error) {
         console.error("Error updating user eligibility", error);
      }
   };

   useEffect(() => {
      getClientAddresses();
   }, []);

   useEffect(() => {
      if (user) {
         updateUserEligibility();
      }
   }, [isUserEligible, user]);

   return user && clientAddresses ? (
      <div className="calendar-container">
         <UserCalendar
            userId={user._id}
            dateClick={handleDateClick}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{
               left: "prev,next",
               center: "title",
               right: "today",
            }}
            initialView="dayGridMonth"
            nowIndicator={true}
            editable={true}
            selectable={true}
            selectMirror={true}
         />
         <Modal
            dismissible
            size={"sm"}
            show={showModal}
            onClose={() => setShowModal(false)}
         >
            <Modal.Header>Select workplace</Modal.Header>
            <Modal.Body>
               <div className="flex justify-center">
                  <div className="flex me-2">
                     {user.addresses
                        .filter((e) => e.label !== "Client")
                        .map((address) => (
                           <Button
                              onClick={() => handleAddressClick(address)}
                              role="button"
                              key={address._id}
                              className="hover:text-blue-700 me-2"
                           >
                              {address.label}
                           </Button>
                        ))}
                     <Dropdown label="Client">
                        {clientAddresses.map((address) => (
                           <Dropdown.Item
                              key={address._id}
                              onClick={() => handleAddressClick(address)}
                           >
                              {address.label}
                           </Dropdown.Item>
                        ))}
                     </Dropdown>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
         <div className="selected-day flex space-x-4 mt-4 content-center object-center">
            <div className="home rounded-full"></div>
            <div>home</div>
            <div className="office rounded-full"></div> <div>office</div>
            <div className="client rounded-full"></div> <div>client</div>
            <div
               className={`border rounded-3xl p-2 ${
                  isUserEligible ? "bg-eligible" : "bg-notEligible"
               }`}
            >
               {isUserEligible ? "Eligible" : "Not eligible"}
            </div>
         </div>
      </div>
   ) : (
      "Loading..."
   );
}
