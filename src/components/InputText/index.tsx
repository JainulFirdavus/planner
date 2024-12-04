"use client";

import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface InputTextProps {
  index?: number;
  name: string;
  placeholder: string;
  value: string;
  showError: boolean;
  setShowError: React.Dispatch<React.SetStateAction<boolean | boolean[]>>;
  updateHandler: (index?: number, e: ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({
  index,
  name,
  placeholder,
  value,
  showError,
  setShowError,
  updateHandler,
}: InputTextProps) => {
  
  const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (name === "title" || name === "name") {
      setShowError(false);
    } else if (name === "subtask") {
      setShowError((prevSubtaskErrors) => {
        const newSubtaskErrors = Array.isArray(prevSubtaskErrors)
          ? [...prevSubtaskErrors]
          : [];
        if (index !== undefined) {
          newSubtaskErrors[index] = false;
        }
        return newSubtaskErrors;
      });
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (name === "title" || name === "name") {
      updateHandler(e);
    } else if (name === "subtask" && index !== undefined) {
      updateHandler(index, e);
    }
  };

  return (
    <InputGroup>
      <Input
        variant="modal"
        placeholder={placeholder}
        name={name}
        value={value}
        onFocus={onFocusHandler}
        onChange={onChangeHandler}
        isInvalid={showError}
      />
      {showError && (
        <InputRightElement
          textStyle="bodyL"
          fontSize="13px"
          w="fit-content"
          mr={4}
        >
          Can’t be empty
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default InputText;
