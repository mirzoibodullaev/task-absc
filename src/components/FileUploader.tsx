import { FileUpload, Input, InputGroup, Text } from "@chakra-ui/react";
import { GrAttachment } from "react-icons/gr";
import { useState } from "react";

export const FileUploader = () => {
    const [fileName, setFileName] = useState<string | null>(null);

    return (
        <FileUpload.Root
            gap="1"
            maxW="full"
            onFileChange={(details) => {
                const file = details.acceptedFiles[0];
                setFileName(file ? file.name : null);
            }}
        >
            <FileUpload.HiddenInput />
            <FileUpload.Label fontSize="xs" color="gray.500">
                Файлы
            </FileUpload.Label>
            <InputGroup
                borderRadius="3xl"
                endElement={<GrAttachment className="text-purple-500" />}
            >
                <Input
                    asChild
                    borderRadius="3xl"
                    borderColor={fileName ? "purple.400" : undefined}
                >
                    <FileUpload.Trigger>
                        <Text color={fileName ? "inherit" : "gray.500"}>
                            {fileName ?? "Прикрепите файлы"}
                        </Text>
                    </FileUpload.Trigger>
                </Input>
            </InputGroup>
        </FileUpload.Root>
    );
};
