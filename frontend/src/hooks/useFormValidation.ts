import { UseFormSetError, FieldValues } from 'react-hook-form';

export function useFormValidation() {

  const setServerErrors = <T extends FieldValues>(errors: Record<string, string[]>, setError: UseFormSetError<T>) => {
    Object.entries(errors).forEach(([field, messages]) => {
      setError(field as any, {
        type: "manual",
        message: Array.isArray(messages) ? messages[0] : messages as string,
      });
    });
  };

  return { setServerErrors };
}