import { TaskSwitch } from "./TaskSwitch";
import { TaskDescriptionField } from "./TaskDescriptionField";
import { TaskCheckbox } from "./Checkbox";
import { Button, Heading, HStack, Stack } from "@chakra-ui/react";
import { MultiSelect } from "./MultiSelect";
import { DateTimePicker } from "./DateTimePicker";
import { FileUploader } from "./FileUploader";
import AdditionalRoutineTask from "./AdditionalRoutineTask";
import { useState } from "react";
import { usePerformers } from "../hooks/usePerformers";
import { useTopics } from "../hooks/useTopics";
import { useTags } from "../hooks/useTags";
import { useForm, Controller } from "react-hook-form";
import type { FormValues } from "../types/form";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { LiaCheckSquareSolid } from "react-icons/lia";

import { toaster } from "./ui/toaster";

const Form = () => {
  const [isRoutine, setIsRoutine] = useState(false);
  const [isTeam, setIsTeam] = useState(false);
  const [performerSearch, setPerformerSearch] = useState("");

  const { performers } = usePerformers(performerSearch);
  const { topics } = useTopics("");
  const { tags } = useTags("");

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      context: "",
      performers: [],
      topics: [],
      tags: [],
      routineName: "",
      periodicity: [],
      routineDescription: "",
      deadline: { date: null, time: null },
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    reset();
    toaster.create({
      title: "Задача создана",
      description: "Задача успешно создана",
      type: "success",
      meta: { closable: true },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <HStack>
        <LiaCheckSquareSolid className="text-purple-500" size={20} />
        <Heading size="lg">Создание задачи</Heading>
      </HStack>
      <Stack>
        <Controller
          name="context"
          control={control}
          rules={{ required: "Поле обязательно" }}
          render={({ field, fieldState }) => (
            <TaskDescriptionField
              maxLength={4096}
              label="Контекст задачи"
              placeholder="Выполнить какую-нибудь задачу"
              borderColor="purple.400"
              borderRadius="xl"
              h="80px"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <HStack justify="space-between" gap={6} w="full">
          <TaskSwitch
            label="Назначить на команду"
            checked={isTeam}
            onCheckedChange={setIsTeam}
          />
          <HStack alignItems="center">
            <TaskCheckbox
              label="Рутинная задача"
              checked={isRoutine}
              onCheckedChange={setIsRoutine}
            />
            <IoMdInformationCircleOutline
              className="text-purple-500"
              size={20}
            />
          </HStack>
        </HStack>

        {isRoutine && <AdditionalRoutineTask control={control} />}

        <Controller
          name="performers"
          control={control}
          render={({ field, fieldState }) => (
            <MultiSelect
              isMulti
              label="Испольнители задачи"
              placeholder="Укажите испольнителей проекта"
              disabled={!isTeam}
              items={performers}
              value={field.value}
              search={performerSearch}
              onSearchChange={setPerformerSearch}
              onValueChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              label="Срок выполнения"
              value={field.value}
              onDateChange={(date) => field.onChange({ ...field.value, date })}
              onTimeChange={(time) => field.onChange({ ...field.value, time })}
            />
          )}
        />

        <Controller
          name="topics"
          control={control}
          render={({ field }) => (
            <MultiSelect
              label="Указать тему"
              placeholder="Выберите тему"
              items={topics}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <MultiSelect
              isMulti
              label="Теги"
              placeholder="Укажите соответствущие теги"
              items={tags}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />

        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <FileUploader value={field.value} onChange={field.onChange} />
          )}
        />

        <Button type="submit" colorPalette="purple" borderRadius="3xl" w="full">
          Создать задачу
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
