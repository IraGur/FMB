"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useContext } from "react";
import { CalendarContext } from "../context/calendarContext";
import "../globals.css";

const convertDate = (date) => {
   // Get the components of the date (year, month, day)
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
   const day = String(date.getDate()).padStart(2, "0");

   // Create the formatted date string
   const formattedDateString = `${year}-${month}-${day}`;

   return formattedDateString;
};

export default function UserCalendar(props) {
   const { userId, className, resetCalendarData, ...restProps } = props;
   const { calendarData, setCalendarData } = useContext(CalendarContext);

   const getCalendarData = async () => {
      try {
         const res = await fetch(`/api/calendar?userId=${userId}`);
         const data = await res.json();
         setCalendarData(data);
      } catch (error) {
         console.error("Error fetching calendar data", error);
      }
   };

   useEffect(() => {
      //! чтобы функция не вызывалась без данных
      if (!calendarData) {
         getCalendarData();
      }
   }, [calendarData]);

   const CustomCell = (props) => {
      //это компонент //единичная ячейка
      let cellClass;

      const cellDate = convertDate(props.date);

      const matchingRecord = calendarData?.find(
         //employeeCalendar replaced with
         //находит дату в json и сравнивает ее с датой ячейки, предварительно сконвертированной под аналогичный формат
         (record) => record.date === cellDate
      );
      cellClass = matchingRecord?.highlightClass || ""; // Default to an empty string

      return (
         <div className="cell-wrapper">
            <span className={`bg-${cellClass}`}>{props.dayNumberText}</span>
         </div>
      );
   };
   // call your imported function here
   //distance();
   return (
      <div className={`calendar-container ${className || ""}`}>
         <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            dayCellContent={CustomCell}
            {...restProps}
            aspectRatio={2.2}
            firstDay={1}
         />
         {/* вся таблица */}
      </div>
   );
}
