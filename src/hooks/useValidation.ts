import { validationSchema } from "../helpers/validations";
import { useState, useEffect } from "react";

interface Args {
  value: any;
  validateAt: string;
  isFormSubmitted: boolean;
}

const useValidation = ({ value, validateAt, isFormSubmitted }: Args) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string>("");

  const runValidation = async (): Promise<void> => {
    try {
      const valid = await validationSchema.validateAt(validateAt, {
        [validateAt]: value,
      });
      if (valid) {
        setIsValid(true);
        setValidationMessage("");
      }
    } catch (error: any) {
      setIsValid(false);
      setValidationMessage(error.errors[0]);
    }
  };

  useEffect(() => {
    runValidation();
  }, [value, isFormSubmitted]);

  return { isValid, validationMessage };
};

export default useValidation;
