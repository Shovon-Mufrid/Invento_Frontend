import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
import "./calender.css";

const Calendarlist = (data) => {
  // console.log(data);
  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          themeSystem={"Lux"}
          plugins={[dayGridPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          events={data.data}
        />
      </div>
    </div>
  );
};

export default Calendarlist;
