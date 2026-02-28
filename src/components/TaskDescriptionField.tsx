"use client";

import {
    Field,
    Stack,
    Textarea,
    Box,
    Text,
    type TextareaProps,
} from "@chakra-ui/react";

interface TaskDescriptionFieldProps extends Omit<TextareaProps, "value" | "onChange"> {
    label?: string;
    maxLength?: number;
    isRequired?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
}

export const TaskDescriptionField = ({
    label,
    maxLength = 0,
    isRequired = true,
    value = "",
    onChange,
    error,
    ...rest
}: TaskDescriptionFieldProps) => {
    return (
        <Stack gap="1">
            <Field.Root invalid={!!error} required={isRequired}>
                <Field.Label fontSize="xs" color="gray.500">
                    {label} {isRequired && <Field.RequiredIndicator />}
                </Field.Label>

                <Box position="relative" w="full">
                    <Textarea
                        {...rest}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                    />

                    {maxLength > 0 && (
                        <Text
                            position="absolute"
                            bottom="2"
                            right="3"
                            fontSize="xs"
                            color="gray.500"
                        >
                            {value.length}/{maxLength}
                        </Text>
                    )}
                </Box>

                {error && <Field.ErrorText>{error}</Field.ErrorText>}
            </Field.Root>
        </Stack>
    );
};
