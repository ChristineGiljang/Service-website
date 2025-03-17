import { useState } from "react";
import { Trash } from "lucide-react";

const AvailabilityCalendar = ({ onPrevious, onFinish }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [schedule, setSchedule] = useState(
    days.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {})
  );

  const convertTo24Hour = (hour, minute, period) => {
    let h = parseInt(hour);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${minute}`;
  };

  const addTimeSlot = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: [...prev[day], { startHour: "06", startMinute: "00", startPeriod: "AM", endHour: "06", endMinute: "00", endPeriod: "AM" }],
    }));
  };

  const removeTimeSlot = (day, index) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const updateSlot = (day, index, field, value) => {
    setSchedule((prev) => {
      const updatedSlots = [...prev[day]];
      updatedSlots[index][field] = value;
      return { ...prev, [day]: updatedSlots };
    });
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg w-full">
      <h2 className="text-xl font-bold text-center mb-4">Set Availability</h2>
      {days.map((day) => (
        <div key={day} className="mb-4 border-b pb-3">
          <div className="flex items-center justify-between">
            <span className="w-24 font-semibold">{day}</span>
            <button
              onClick={() => addTimeSlot(day)}
              className="bg-gray-700 text-white p-2 rounded-lg shadow-md hover:bg-gray-600"
            >
              + Add Slot
            </button>
          </div>

          {schedule[day].length === 0 ? (
            <span className="text-gray-400">Not bookable</span>
          ) : (
            schedule[day].map((slot, index) => (
              <div key={index} className="mt-3 flex flex-col md:flex-row md:items-center gap-y-2 gap-x-3">
                {/* Start Time */}
                <div className="flex items-center gap-x-2">
                  <span className="text-gray-600">Start:</span>
                  <select value={slot.startHour} onChange={(e) => updateSlot(day, index, "startHour", e.target.value)} className="min-w-[60px] p-2 border rounded">
                    {[...Array(12).keys()].map((h) => (
                      <option key={h + 1} value={String(h + 1).padStart(2, "0")}>{h + 1}</option>
                    ))}
                  </select>

                  <select value={slot.startMinute} onChange={(e) => updateSlot(day, index, "startMinute", e.target.value)} className="min-w-[60px] p-2 border rounded">
                    {["00", "15", "30", "45"].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <select value={slot.startPeriod} onChange={(e) => updateSlot(day, index, "startPeriod", e.target.value)} className="min-w-[60px] p-2 border rounded">
                    {["AM", "PM"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* End Time */}
                <div className="flex items-center gap-x-2">
                  <span className="text-gray-600">End:</span>
                  <select value={slot.endHour} onChange={(e) => updateSlot(day, index, "endHour", e.target.value)} className="min-w-[60px] p-2 border rounded">
                    {[...Array(12).keys()].map((h) => (
                      <option key={h + 1} value={String(h + 1).padStart(2, "0")}>{h + 1}</option>
                    ))}
                  </select>

                  <select value={slot.endMinute} onChange={(e) => updateSlot(day, index, "endMinute", e.target.value)} className="min-w-[60px] p-2 border rounded">
                    {["00", "15", "30", "45"].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <select value={slot.endPeriod} onChange={(e) => updateSlot(day, index, "endPeriod", e.target.value)} className="min-w-[60px] p-2 border rounded">
                    {["AM", "PM"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <button onClick={() => removeTimeSlot(day, index)} className="text-red-500 hover:text-red-700">
                  <Trash size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button onClick={onPrevious} className="bg-gray-300 text-black p-2 rounded w-1/2 mr-2">Previous</button>
        <button
          onClick={() => {
            const formattedSchedule = Object.fromEntries(
              Object.entries(schedule).map(([day, slots]) => [
                day,
                slots.map(({ startHour, startMinute, startPeriod, endHour, endMinute, endPeriod }) => ({
                  start: convertTo24Hour(startHour, startMinute, startPeriod),
                  end: convertTo24Hour(endHour, endMinute, endPeriod),
                })),
              ])
            );
            onFinish(formattedSchedule);
          }}
          className="bg-blue-500 text-white p-2 rounded w-1/2"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
