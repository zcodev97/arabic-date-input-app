import { useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { parseDate } from "../utils/dateUtils";
import { DATE_FORMATS } from "../constants/dateConstants";

dayjs.extend(customParseFormat);

interface UseDateInputProps {
  initialValue: string | null;
  onChange: (value: string | null) => void;
  onValidate?: () => void;
  debounce?: number;
}

interface DateSuggestion {
  value: string;
  label: string;
}

export const useDateInput = ({
  initialValue,
  onChange,
  onValidate,
  debounce: delay = 2000,
}: UseDateInputProps) => {
  const [inputValue, setInputValue] = useState(initialValue || "");
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialValue ? dayjs(initialValue).toDate() : null
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [suggestions, setSuggestions] = useState<DateSuggestion[]>([]);

  useEffect(() => {
    if (initialValue) {
      setInputValue(dayjs(initialValue).format("YYYY-MM-DD"));
    }
  }, [initialValue]);

  // Handle input changes with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue.length < 4) {
        // Not enough digits to parse
        setErrorMessage("");
        setSuggestions([]);
        setSelectedDate(null);
        onChange(null);
        return;
      }

      const possibleDates = parseDate(inputValue);

      if (possibleDates.length === 0) {
        // Could not parse date, generate suggestions
        generateAndSetSuggestions(inputValue);
        setSelectedDate(null);
        onChange(null);
      } else {
        const validDates = possibleDates
          .map(({ year, month, day }) => {
            const date = dayjs(`${year}-${month}-${day}`, "YYYY-M-D", true);
            if (date.isValid()) {
              return {
                value: date.format("YYYY-MM-DD"),
                label: date.format("DD-MM-YYYY"),
              };
            }
            return null;
          })
          .filter(Boolean) as DateSuggestion[];

        if (validDates.length === 0) {
          // No valid dates, generate suggestions
          generateAndSetSuggestions(inputValue);
          setSelectedDate(null);
          onChange(null);
        } else if (validDates.length === 1) {
          // Only one valid date
          const selected = validDates[0];
          setInputValue(selected.value);
          setSelectedDate(dayjs(selected.value).toDate());
          setErrorMessage("");
          setSuggestions([]);
          onChange(selected.value);
          onValidate?.();
        } else {
          // Multiple valid dates, select the first one as default
          //   const firstDate = validDates[0];
          //   setInputValue(firstDate.value);
          //   setSelectedDate(dayjs(firstDate.value).toDate());
          //   setErrorMessage("");
          setSuggestions(validDates);
          //   onChange(firstDate.value);
          onValidate?.();
        }
      }
    }, delay); // Delay in milliseconds

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    // Parsing and validation will be handled after a delay in the useEffect
  };

  const generateAndSetSuggestions = (value: string) => {
    const newSuggestions = generateSuggestions(value);
    if (newSuggestions.length > 0) {
      setSuggestions(newSuggestions);
      setErrorMessage("");
    } else {
      setSuggestions([]);
      setErrorMessage("التاريخ غير صالح.");
    }
  };

  const generateSuggestions = (value: string): DateSuggestion[] => {
    const suggestions: DateSuggestion[] = [];

    // Use possible dates from parseDate
    const possibleDates = parseDate(value);

    possibleDates.forEach(({ year, month, day }) => {
      const date = dayjs(`${year}-${month}-${day}`, "YYYY-M-D", true);
      if (date.isValid()) {
        suggestions.push({
          value: date.format("YYYY-MM-DD"),
          label: date.format("YYYY-MM-DD"),
        });
      }
    });

    // Additionally, try standard formats
    DATE_FORMATS.forEach((format) => {
      const date = dayjs(value, format, true);
      if (date.isValid()) {
        suggestions.push({
          value: date.format("YYYY-MM-DD"),
          label: date.format("YYYY-MM-DD"),
        });
      }
    });

    // Remove duplicate suggestions
    const uniqueSuggestions = Array.from(
      new Map(suggestions.map((item) => [item.value, item])).values()
    );

    return uniqueSuggestions;
  };

  const handleSuggestionSelect = (suggestion: DateSuggestion) => {
    setInputValue(suggestion.value);
    setSelectedDate(dayjs(suggestion.value).toDate());
    setErrorMessage("");
    setSuggestions([]);
    onChange(suggestion.value);
    onValidate?.();
  };

  const handleDatePickerChange = (date: Date) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setInputValue(formattedDate);
      setSelectedDate(date);
      setErrorMessage("");
      setSuggestions([]);
      onChange(formattedDate);
      onValidate?.();
    }
  };

  return {
    inputValue,
    selectedDate,
    errorMessage,
    suggestions,
    handleInputChange,
    handleSuggestionSelect,
    handleDatePickerChange,
  };
};
