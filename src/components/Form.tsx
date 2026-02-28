import { TaskSwitch } from "./TaskSwitch";
import { TaskDescriptionField } from "./TaskDescriptionField";
import { TaskCheckbox } from "./Checkbox";
import { Button, HStack, Stack } from "@chakra-ui/react";
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
import { toaster } from "./ui/toaster";

const Form = () => {
    const [isRoutine, setIsRoutine] = useState(false);
    const [isTeam, setIsTeam] = useState(false);
    const [performerSearch, setPerformerSearch] = useState("");

    const { performers } = usePerformers(performerSearch);
    const { topics } = useTopics("");
    const { tags } = useTags("");

    const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            context: "",
            performers: [],
            topics: [],
            tags: [],
            routineName: "",
            periodicity: [],
            routineDescription: "",
        },
    });

    const onSubmit = () => {
        toaster.create({
            title: "Задача создана",
            description: "Задача успешно создана",
            type: "success",
            meta: { closable: true },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    <TaskCheckbox
                        label="Рутинная задача"
                        checked={isRoutine}
                        onCheckedChange={setIsRoutine}
                    />
                </HStack>

                {isRoutine && <AdditionalRoutineTask control={control} />}

                <Controller
                    name="performers"
                    control={control}
                    rules={{
                        validate: (v) =>
                            !isTeam || v.length > 0 || "Укажите исполнителей",
                    }}
                    render={({ field, fieldState }) => (
                        <MultiSelect
                            isMulti
                            label="Испольнители задачи"
                            placeholder="Укажите испольнителей проекта"
                            disabled={!isTeam}
                            items={performers}
                            search={performerSearch}
                            onSearchChange={setPerformerSearch}
                            onValueChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />

                <DateTimePicker label="Срок выполнения" />

                <Controller
                    name="topics"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect
                            label="Указать тему"
                            placeholder="Выберите тему"
                            items={topics}
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
                            onValueChange={field.onChange}
                        />
                    )}
                />

                <FileUploader />

                <Button
                    type="submit"
                    colorPalette="purple"
                    borderRadius="3xl"
                    w="full"
                >
                    Создать задачу
                </Button>
            </Stack>
        </form>
    );
};

export default Form;
