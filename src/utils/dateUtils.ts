// ../utils/dateUtils.js

export const parseDate = (value: any) => {
  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.length >= 4) {
    const year = digitsOnly.substring(0, 4);
    const remaining = digitsOnly.substring(4);

    const yearInt = parseInt(year, 10);

    const possibleDates = [];

    if (remaining.length === 0) {
      // No remaining digits, default month and day
      possibleDates.push({ year: yearInt, month: 1, day: 1 });
    } else if (remaining.length === 1) {
      // Remaining digit is for month
      const monthInt = parseInt(remaining.padStart(2, "0"), 10);
      possibleDates.push({ year: yearInt, month: monthInt, day: 1 });
    } else if (remaining.length === 2) {
      // Remaining digits are for month and day (each one digit)
      const monthInt = parseInt(remaining.charAt(0).padStart(2, "0"), 10);
      const dayInt = parseInt(remaining.charAt(1).padStart(2, "0"), 10);
      possibleDates.push({ year: yearInt, month: monthInt, day: dayInt });
    } else if (remaining.length === 3) {
      // Ambiguous case: two possibilities
      // Option 1: MM D
      const monthOption1 = parseInt(remaining.substring(0, 2), 10);
      const dayOption1 = parseInt(remaining.charAt(2).padStart(2, "0"), 10);
      possibleDates.push({
        year: yearInt,
        month: monthOption1,
        day: dayOption1,
      });

      // Option 2: M DD
      const monthOption2 = parseInt(remaining.charAt(0).padStart(2, "0"), 10);
      const dayOption2 = parseInt(remaining.substring(1, 3), 10);
      possibleDates.push({
        year: yearInt,
        month: monthOption2,
        day: dayOption2,
      });
    } else if (remaining.length === 4) {
      // Remaining digits are for month and day (each two digits)
      const monthInt = parseInt(remaining.substring(0, 2), 10);
      const dayInt = parseInt(remaining.substring(2, 4), 10);
      possibleDates.push({ year: yearInt, month: monthInt, day: dayInt });
    } else {
      // Remaining digits don't fit expected patterns
      return [];
    }

    return possibleDates;
  }

  return [];
};
