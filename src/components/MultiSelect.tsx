"use client";

import {
    Avatar,
    Badge,
    Checkbox,
    HStack,
    Input,
    Portal,
    Select,
    Text,
    createListCollection,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";

export type SelectItem = {
    label: string;
    value: string;
    avatar?: string;
    bg?: string;
};

interface MultiSelectProps {
    placeholder?: string;
    label?: string;
    isMulti?: boolean;
    isRequired?: boolean;
    disabled?: boolean;
    items: SelectItem[];
    search?: string;
    onSearchChange?: (value: string) => void;
    onValueChange?: (values: string[]) => void;
    error?: string;
}

const renderSelectedItem = (item: SelectItem) => {
    if (item.bg) {
        return (
            <Badge
                key={item.value}
                bg={item.bg}
                color="white"
                borderRadius="full"
                px="2"
                fontSize="xs"
            >
                {item.label}
            </Badge>
        );
    }
    if (item.avatar) {
        return (
            <Badge
                key={item.value}
                bg="purple.500/20"
                color="purple.600"
                borderRadius="full"
                pl="1"
                pr="2"
                fontSize="xs"
            >
                <HStack gap="1">
                    <Avatar.Root size="2xs">
                        <Avatar.Image src={item.avatar} />
                        <Avatar.Fallback>{item.label[0]}</Avatar.Fallback>
                    </Avatar.Root>
                    {item.label}
                </HStack>
            </Badge>
        );
    }
    return (
        <Text key={item.value} fontSize="sm">
            {item.label}
        </Text>
    );
};

export const MultiSelect = ({
    placeholder,
    label,
    isMulti,
    isRequired = false,
    disabled = false,
    items,
    search,
    onSearchChange,
    onValueChange,
    error,
}: MultiSelectProps) => {
    const MAX_VISIBLE = 2;
    const [selected, setSelected] = useState<SelectItem[]>([]);
    const collection = useMemo(() => createListCollection({ items }), [items]);
    const visibleItems = selected.slice(0, MAX_VISIBLE);
    const hiddenCount = selected.length - MAX_VISIBLE;

    return (
        <>
        <Select.Root
            multiple={isMulti}
            collection={collection}
            size="sm"
            width="full"
            disabled={disabled}
            onValueChange={(details) => {
                setSelected(details.items as SelectItem[]);
                onValueChange?.(details.value);
            }}
        >
            <Select.HiddenSelect />
            <Select.Label fontSize="xs" color="gray.500">
                {label}{" "}
                {isRequired && (
                    <Text as="span" color="red.500">
                        *
                    </Text>
                )}
            </Select.Label>
            <Select.Control>
                <Select.Trigger
                    borderRadius="3xl"
                    borderColor={selected.length > 0 ? "purple.500" : undefined}
                    _open={{ borderColor: "purple.500" }}
                    _focusVisible={{
                        borderColor: "purple.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
                    }}
                >
                    {selected.length === 0 ? (
                        <Select.ValueText placeholder={placeholder} />
                    ) : (
                        <HStack flexWrap="nowrap" gap="1" overflow="hidden">
                            {visibleItems.map(renderSelectedItem)}
                            {hiddenCount > 0 && (
                                <Badge
                                    flexShrink={0}
                                    borderRadius="full"
                                    px="2"
                                    fontSize="xs"
                                    colorPalette="gray"
                                >
                                    +{hiddenCount}
                                </Badge>
                            )}
                        </HStack>
                    )}
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {onSearchChange && (
                            <Input
                                size="sm"
                                placeholder="Поиск..."
                                value={search ?? ""}
                                onChange={(e) => onSearchChange(e.target.value)}
                                mb="2"
                            />
                        )}
                        {items.map((item) => (
                            <Select.Item
                                item={item}
                                key={item.value}
                                borderWidth="1px"
                                borderColor="purple.300"
                                borderRadius="xl"
                                mb="1"
                            >
                                <HStack>
                                    <Checkbox.Root
                                        checked={selected.some(
                                            (s) => s.value === item.value
                                        )}
                                        colorPalette="purple"
                                        pointerEvents="none"
                                    >
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control borderRadius="sm" />
                                    </Checkbox.Root>
                                    {item.avatar && (
                                        <Avatar.Root size="xs">
                                            <Avatar.Image src={item.avatar} />
                                            <Avatar.Fallback>
                                                {item.label[0]}
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                    )}
                                    {item.bg ? (
                                        <Badge
                                            bg={item.bg}
                                            color="white"
                                            borderRadius="full"
                                            px="2"
                                        >
                                            {item.label}
                                        </Badge>
                                    ) : (
                                        item.label
                                    )}
                                </HStack>
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
        {error && (
            <Text fontSize="xs" color="red.500">
                {error}
            </Text>
        )}
        </>
    );
};
