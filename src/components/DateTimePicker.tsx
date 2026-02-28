import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { VStack, HStack, Text } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";

interface DateTimePickerProps {
  label?: string;
  value?: { date: Date | null; time: Date | null };
  onDateChange?: (date: Date | null) => void;
  onTimeChange?: (time: Date | null) => void;
}

export const DateTimePicker = ({
  label,
  value = { date: null, time: null },
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) => {
  return (
    <VStack align="start" gap={2}>
      {label && (
        <Text ml={3} fontSize="xs" fontWeight="medium" color="gray.500">
          {label}
        </Text>
      )}
      <HStack
        gap={3}
        w="full"
        css={{
          "& .react-datepicker-wrapper": { flex: 1, minWidth: 0 },
          "& .react-datepicker__input-container": { width: "100%" },
          "& .react-datepicker__input-container input": {
            width: "100%",
            height: "32px",
            padding: "0 12px",
            borderRadius: "9999px",
            border: "1px solid var(--chakra-colors-border)",
            fontSize: "14px",
            outline: "none",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
          },
          "& .react-datepicker__input-container input:focus": {
            borderColor: "var(--chakra-colors-purple-500)",
            boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
          },
        }}
      >
        <DatePicker
          selected={value.date}
          onChange={(v: Date | null) => onDateChange?.(v)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date"
          portalId="root"
        />

        <DatePicker
          selected={value.time}
          onChange={(v: Date | null) => onTimeChange?.(v)}
          showTimeSelect
          showTimeSelectOnly
          dateFormat="HH:mm"
          placeholderText="Select time"
          portalId="root"
        />
        <FaCalendarAlt className="text-purple-500" />
      </HStack>
    </VStack>
  );
};
