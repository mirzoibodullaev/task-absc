import { Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { TaskDescriptionField } from "./TaskDescriptionField";
import { TaskInput } from "./TaskInput";
import { MultiSelect } from "./MultiSelect";
import { usePeriodicity } from "../hooks/usePeriodicity";
import type { FormValues } from "../types/form";

interface AdditionalRoutineTaskProps {
  control: Control<FormValues>;
}

const AdditionalRoutineTask = ({ control }: AdditionalRoutineTaskProps) => {
  const [periodicitySearch, setPeriodicitySearch] = useState("");
  const { periodicity } = usePeriodicity(periodicitySearch);

  return (
    <Stack
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="purple.500"
      borderRadius="4xl"
      p="4"
    >
      <Controller
        name="routineName"
        control={control}
        shouldUnregister
        rules={{ required: "Укажите название" }}
        render={({ field, fieldState }) => (
          <TaskInput
            required
            borderColor="gray.400"
            label="Название рутинной задачи"
            placeholder="Укажите название рутинной задачи"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="periodicity"
        control={control}
        shouldUnregister
        rules={{
          validate: (v) => v.length > 0 || "Выберите периодичность",
        }}
        render={({ field, fieldState }) => (
          <MultiSelect
            isRequired
            label="Периодичность"
            placeholder="Выберите периодичность"
            value={field.value}
            items={periodicity}
            search={periodicitySearch}
            onSearchChange={setPeriodicitySearch}
            onValueChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="routineDescription"
        control={control}
        shouldUnregister
        render={({ field }) => (
          <TaskDescriptionField
            isRequired={false}
            maxLength={255}
            label="Описание"
            placeholder="Описание рутинной задачи"
            h="80px"
            borderColor="gray.400"
            borderRadius="xl"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </Stack>
  );
};

export default AdditionalRoutineTask;
