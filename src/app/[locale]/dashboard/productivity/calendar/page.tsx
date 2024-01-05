
import Calendar from "@/components/Calender";
import CalendarComponent from "@/components/Calender/calendar_view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar Page | Next.js E-commerce Dashboard Template",
  description: "This is Calendar page for TailAdmin Next.js",
  // other metadata
};

const CalendarPage = () => {
  return (
    <>
      <CalendarComponent />
    </>
  );
};

export default CalendarPage;
