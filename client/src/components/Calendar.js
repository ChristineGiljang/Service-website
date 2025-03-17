import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem("userId");

  const getNextDayOfWeek = (day, time) => {
    const daysOfWeek = {
      Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
      Thursday: 4, Friday: 5, Saturday: 6
    };

    const today = new Date();
    const targetDay = daysOfWeek[day];
    let dayDifference = targetDay - today.getDay();
    if (dayDifference < 0) dayDifference += 7;

    const nextDate = new Date();
    nextDate.setDate(today.getDate() + dayDifference);

    // Convert time to 24-hour format
    let formattedTime = time.includes("AM") || time.includes("PM") ? time : `${time} AM`;
    const [hourMinute, period] = formattedTime.split(" ");
    let [hours, minutes] = hourMinute.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    nextDate.setHours(hours, minutes, 0, 0);
    return nextDate.toISOString();
  };

  const formatAvailabilityForCalendar = (availabilityData) => {
    return Object.entries(availabilityData).flatMap(([day, slots]) =>
      slots.map((slot) => ({
        title: "Available",
        start: getNextDayOfWeek(day, `${slot.start}`),  
        end: getNextDayOfWeek(day, `${slot.end}`),
        allDay: false,
        backgroundColor: "#4CAF50", // Green background
        borderColor: "#388E3C", // Darker green border
        textColor: "#ffffff", // White text for contrast
      }))
    );
  };

  useEffect(() => {
    const fetchAvailability = async () => {
        try {
          const response = await fetch(`/api/availability/${userId}`, {
            method: "GET",
            headers: { "Accept": "application/json" },
          });
      
          console.log("Response URL:", response.url);
          console.log("Response Headers:", response.headers);
      
          const text = await response.text(); // Read raw response
          console.log("Raw text response:", text); // Log the actual response
      
          // Ensure response is JSON before parsing
          if (response.headers.get("content-type")?.includes("application/json")) {
            const data = JSON.parse(text);
            setEvents(formatAvailabilityForCalendar(data));
          } else {
            console.error("Response is not JSON. Received:", text);
          }
        } catch (error) {
          console.error("Error fetching availability:", error);
        }
      };
  
    fetchAvailability();
  }, [userId]);
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Availability Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        events={events}
        editable={false}
        selectable={false}
        nowIndicator={true}
        eventContent={(eventInfo) => (
          <div
            style={{
              backgroundColor: eventInfo.event.backgroundColor,
              borderColor: eventInfo.event.borderColor,
              color: eventInfo.event.textColor,
              padding: "4px",
              borderRadius: "4px",
            }}
          >
            {eventInfo.event.title}
          </div>
        )}
      />
    </div>
  );
};

export default Calendar;
