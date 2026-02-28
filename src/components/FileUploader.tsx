import { FileUpload, Input, InputGroup, Text } from "@chakra-ui/react";
import { GrAttachment } from "react-icons/gr";

interface FileUploaderProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
}

export const FileUploader = ({ value, onChange }: FileUploaderProps) => {
  const fileName = value?.name ?? null;

  return (
    <FileUpload.Root
      gap="1"
      maxW="full"
      onFileChange={(details) => {
        const file = details.acceptedFiles[0] ?? null;
        onChange?.(file);
      }}
    >
      <FileUpload.HiddenInput />
      <FileUpload.Label ml={3} fontSize="xs" color="gray.500">
        Файлы
      </FileUpload.Label>
      <InputGroup borderRadius="3xl" endElement={<GrAttachment className="text-purple-500" />}>
        <Input asChild borderRadius="3xl" borderColor={fileName ? "purple.400" : undefined}>
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