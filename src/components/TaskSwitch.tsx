"use client";

import { Switch } from "@chakra-ui/react";

interface TaskSwitchProps {
    label?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export const TaskSwitch = ({ label, checked, onCheckedChange }: TaskSwitchProps) => {
    return (
        <Switch.Root
            checked={checked}
            onCheckedChange={(e) => onCheckedChange?.(e.checked)}
        >
            <Switch.HiddenInput />
            <Switch.Control>
                <Switch.Thumb />
            </Switch.Control>
            <Switch.Label fontSize="xs" color="gray.500">
                {label}
            </Switch.Label>
            <Switch.Label />
        </Switch.Root>
    );
};
