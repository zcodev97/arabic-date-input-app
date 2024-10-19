import React, { useState, useRef, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
// @ts-ignore
import { ar } from "date-fns/locale";
import { ARABIC_DAYS, ARABIC_MONTHS } from "../constants/dateConstants";
import { useDateInput } from "../hooks/useDateInput";
import { CustomCalendarHeader } from "./CustomCalenderHeader";
import "../index.css";
// Custom Arabic locale
const arCustom: any = {
  ...ar,
  localize: {
    ...ar.localize,
    day: (n: number) => ARABIC_DAYS[n],
  },
};

registerLocale("ar-custom", arCustom);

interface DatePickerComponentProps {
  className?: string;
  minDate?: Date;
  placeholder?: string;
  field?: {
    value: string | null;
    onChange: (value: string | null) => void;
  };
  form?: any;
  inputStyle?: React.CSSProperties;
  calendarStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  icon?: React.ReactNode;
  iconStyle?: React.CSSProperties;
  debounceMilliseconds?: number;
  suggestionMessage?: string;
}

const ADISA: React.FC<DatePickerComponentProps> = ({
  field,
  minDate,
  placeholder = "yyyy-mm-dd",
  className = "adisa-input",
  inputStyle,
  calendarStyle,
  containerStyle,
  icon,
  iconStyle,
  form,
  debounceMilliseconds: delay,
  suggestionMessage = "الرجاء اختيار تاريخ من القائمة",
}) => {
  const {
    inputValue,
    selectedDate,
    errorMessage,
    suggestions,
    handleInputChange,
    handleSuggestionSelect,
    handleDatePickerChange,
  } = useDateInput({
    initialValue: field?.value || null,
    onChange: field?.onChange || (() => {}),
    onValidate: form?.trigger,
    debounce: delay,
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarContainerRef.current &&
      !calendarContainerRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setIsCalendarOpen(false);
    }
  };

  useEffect(() => {
    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  return (
    <div className="custom-container">
      <div
        style={{
          position: "relative",
          display: "inline-block",
          ...containerStyle,
        }}
        dir="rtl"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
          className="custom-flex"
        >
          <input
            autoComplete="off"
            id="date-input"
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            style={{ paddingRight: "50px", width: "150px", ...inputStyle }}
            ref={inputRef}
            dir="rtl"
            className={className}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              marginRight: "20px",
              ...iconStyle,
            }}
            onClick={handleCalendarIconClick}
          >
            {icon ? icon : <FaCalendarAlt size={20} />}
          </div>

          {isCalendarOpen && (
            <div
              ref={calendarContainerRef}
              style={{
                position: "absolute",
                bottom: "100%",
                zIndex: 1,
                ...calendarStyle,
              }}
            >
              <DatePicker
                className="custom-datepicker"
                selected={selectedDate}
                onChange={handleDatePickerChange as any}
                minDate={minDate ?? undefined}
                inline
                locale="ar-custom"
                dateFormat="dd-MM-yyyy"
                calendarClassName="custom-calendar"
                dayClassName={() => "custom-day"}
                showMonthDropdown
                useShortMonthInDropdown={false}
                monthsShown={1}
                renderMonthContent={(month) => ARABIC_MONTHS[month]}
                renderCustomHeader={(props) => (
                  <CustomCalendarHeader {...props} />
                )}
              />
            </div>
          )}
        </div>
      </div>
      {errorMessage && <div className="custom-error">{errorMessage}</div>}

      {suggestions.length > 0 && (
        <div
          style={{
            width: "100%",
            border: "1px dotted gray",
            borderRadius: "10px",
            padding: "2px",
          }}
        >
          <div
            dir="rtl"
            style={{
              padding: "10px",
            }}
          >
            {suggestionMessage}
          </div>
          {suggestions.map((s, index) => (
            <div
              dir="rtl"
              key={index}
              onClick={() => handleSuggestionSelect(s)}
              className="custom-suggestion-content custom-suggestion-item"
            >
              {s.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ADISA;
