import React, { useState, useEffect } from "react";
import MaskInput from "../InputMask";

interface TimeInputProps {
  value: number | string;
  name: string;
  onChange: (e: any) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const minutesToTimeStr = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

const toTimeStr = (value: number | string): string => {
  if (typeof value === "number" && !isNaN(value)) return minutesToTimeStr(value);
  if (typeof value === "string" && value !== "" && !isNaN(Number(value))) return minutesToTimeStr(Number(value));
  if (typeof value === "string" && /^\d{2}:\d{2}$/.test(value)) return value;
  return "";
};

const TimeInput: React.FC<TimeInputProps> = ({ value, name, onChange, placeholder, disabled }) => {
  const [timeStr, setTimeStr] = useState(() => toTimeStr(value));

  useEffect(() => {
    setTimeStr(toTimeStr(value));
  }, [value]);

  const handleChange = (e: any) => {
    const val = e.target.value;
    setTimeStr(val);
    
    if (val && !val.includes("_")) {
      const [hours, minutes] = val.split(":");
      const totalMinutes = parseInt(hours || "0", 10) * 60 + parseInt(minutes || "0", 10);
      onChange({ target: { name, value: totalMinutes } });
    } else if (!val || val.replace(/[:_]/g, "").length === 0) {
      onChange({ target: { name, value: "" } });
    }
  };

  return (
    <MaskInput
      mask="99:99"
      value={timeStr}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default TimeInput;
