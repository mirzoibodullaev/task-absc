import { Checkbox } from "@chakra-ui/react";

interface TaskCheckbox {
    label?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export const TaskCheckbox = ({ label, checked, onCheckedChange }: TaskCheckbox) => {
    return (
        <Checkbox.Root
            colorPalette="purple"
            checked={checked}
            onCheckedChange={(e) => onCheckedChange?.(!!e.checked)}
        >
            <Checkbox.HiddenInput />
            <Checkbox.Control borderRadius="sm" />
            <Checkbox.Label fontSize="xs" color="gray.500">
                {label}
            </Checkbox.Label>
        </Checkbox.Root>
    );
};
