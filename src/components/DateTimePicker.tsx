import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input, VStack, HStack, Text } from "@chakra-ui/react";
import { forwardRef, useState } from "react";

type ChakraInputProps = {
    value?: string;
    onClick?: () => void;
    onChange?: () => void;
    placeholder?: string;
};

interface DateTimePickerProps {
    label?: string;
}

const ChakraInput = forwardRef<HTMLInputElement, ChakraInputProps>(
    ({ value, onClick, onChange, placeholder }, ref) => (
        <Input
            ref={ref}
            value={value}
            onClick={onClick}
            onChange={onChange}
            placeholder={placeholder}
            cursor="pointer"
            borderRadius="3xl"
            borderColor={value ? "purple.500" : undefined}
            css={{
                "&:focus-visible": {
                    borderColor: "var(--chakra-colors-purple-500)",
                    boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
                }
            }}
        />
    ),
);

export const DateTimePicker = ({ label }: DateTimePickerProps) => {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);

    return (
        <VStack align="start" gap={2}>
            {label && (
                <Text fontSize="xs" fontWeight="medium" color="gray.500">
                    {label}
                </Text>
            )}
            <HStack gap={3}>
                <DatePicker
                    selected={date}
                    onChange={(v: Date | null) => setDate(v)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                    customInput={<ChakraInput />}
                />

                <DatePicker
                    selected={time}
                    onChange={(v: Date | null) => setTime(v)}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="HH:mm"
                    placeholderText="Select time"
                    customInput={<ChakraInput />}
                />
            </HStack>
        </VStack>
    );
};