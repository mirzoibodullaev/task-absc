"use client";

import { Input, InputGroup, Text, type InputProps } from "@chakra-ui/react";

const MAX_CHARACTERS = 20;

interface TaskInputProps extends Omit<InputProps, "value" | "onChange"> {
    maxCharacters?: number;
    label?: string;
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
}

export const TaskInput = ({
    maxCharacters = MAX_CHARACTERS,
    label,
    required = false,
    value = "",
    onChange,
    error,
    ...rest
}: TaskInputProps) => {
    return (
        <>
            {label && (
                <Text ml={3} fontSize="xs" fontWeight="medium" color="gray.500">
                    {label}{" "}
                    {required && <span style={{ color: "red" }}>*</span>}
                </Text>
            )}

            <InputGroup
                endElement={
                    <Text color="gray.500" fontSize="xs" px="2">
                        {value.length} / {maxCharacters}
                    </Text>
                }
            >
                <Input
                    borderRadius="3xl"
                    value={value}
                    maxLength={maxCharacters}
                    onChange={(e) =>
                        onChange?.(e.currentTarget.value.slice(0, maxCharacters))
                    }
                    required={required}
                    {...rest}
                />
            </InputGroup>

            {error && (
                <Text fontSize="xs" color="red.500">
                    {error}
                </Text>
            )}
        </>
    );
};
