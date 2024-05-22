import React from "react";

interface MonthYearSelectorProps {
  date: string;
  onDateChange: (newDate: string) => void;
}

const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
  date,
  onDateChange,
}) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value;
    onDateChange(selectedDate); // Pass the selected date directly
  };

  // Generate month-year options
  const generateMonthYearOptions = () => {
    const options = [];
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 10; // Adjust the range as needed

    for (let year = currentYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month);
        const monthName = date.toLocaleString("en-US", { month: "long" });
        const value = `${monthName} ${year}`;
        options.push(value);
      }
    }

    return options;
  };

  const monthYearOptions = generateMonthYearOptions();

  return (
    <div className="flex flex-col items-center">
      <select
        value={date}
        onChange={handleDateChange}
        className="border-2 border-gray-300 p-2 px-5 rounded-lg text-lg"
      >
        <option value="" disabled>
          Select Month
        </option>
        {monthYearOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthYearSelector;
