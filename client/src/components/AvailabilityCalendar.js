import { useState } from "react";
import { Trash } from "lucide-react";

const AvailabilityCalendar = ({ onPrevious, onFinish, formData, setFormData }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = Array.from({ length: 30 }, (_, i) => {
    const hours = String(Math.floor(i / 2) + 6).padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  });

  const [schedule, setSchedule] = useState(
    days.reduce((acc, day) => {
      acc[day] = day === "Saturday" || day === "Sunday" ? [] : [{ start: "06:00", end: "06:00" }];
      return acc;
    }, {})
  );

  const addTimeSlot = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: [{ start: "06:00", end: "06:00" }],
    }));
  };

  const removeTimeSlot = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: [],
    }));
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg w-96 shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">Set Availability</h2>
      {days.map((day) => (
        <div key={day} className="mb-4 border-b pb-3">
          <div className="flex items-center justify-between">
            <span className="w-24 font-semibold">{day}</span>
            {schedule[day].length > 0 ? (
              <div className="flex items-center space-x-2">
                <select
                  value={schedule[day][0].start}
                  onChange={(e) => {
                    const newTime = e.target.value;
                    setSchedule((prev) => ({
                      ...prev,
                      [day]: [{ ...prev[day][0], start: newTime }],
                    }));
                  }}
                  className="bg-gray-200 p-1 rounded"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <select
                  value={schedule[day][0].end}
                  onChange={(e) => {
                    const newTime = e.target.value;
                    setSchedule((prev) => ({
                      ...prev,
                      [day]: [{ ...prev[day][0], end: newTime }],
                    }));
                  }}
                  className="bg-gray-200 p-1 rounded"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <button onClick={() => removeTimeSlot(day)} className="text-red-500">
                  <Trash size={18} />
                </button>
              </div>
            ) : (
              <span className="text-gray-400">Not bookable</span>
            )}
            <button
              onClick={() => addTimeSlot(day)}
              className="bg-gray-700 text-white p-1 rounded ml-2"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button onClick={onPrevious} className="bg-gray-300 text-black p-2 rounded w-1/2 mr-2">Previous</button>
        <button onClick={() => onFinish(schedule)} className="bg-blue-500 text-white p-2 rounded w-1/2">Finish</button>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
