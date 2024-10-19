import React from "react";
import { ARABIC_MONTHS } from "../constants/dateConstants";
import "../index.css";
interface CustomCalendarHeaderProps {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

export const CustomCalendarHeader: React.FC<CustomCalendarHeaderProps> = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  return (
    <div className="custom-header">
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        {"<"}
      </button>
      <div className="custom-dropdown-container">
        <select
          value={date.getMonth()}
          onChange={({ target: { value } }) => changeMonth(parseInt(value))}
          className="custom-month-dropdown"
        >
          {ARABIC_MONTHS.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={date.getFullYear()}
          onChange={({ target: { value } }) => changeYear(parseInt(value))}
          className="custom-year-dropdown"
        >
          {Array.from(
            { length: 100 },
            (_, i) => date.getFullYear() - 10 + i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        {">"}
      </button>
    </div>
  );
};
