import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Book, BookCreateInput, BookUpdateInput, BookFormValues } from '../../../types/book';
import Button from '../../../components/ui/Button';
import { InputForm } from '../../../components/ui/InputForm';
import { useFetchBook } from '../hooks/useFetchBook';
import { useCreateBook } from '../hooks/useCreateBook';
import { useUpdateBook } from '../hooks/useUpdateBook';
import { titleValidation, authorValidation } from '../constants/validationRules';
import { useFormValidation } from '../../../hooks/useFormValidation';

interface BookFormProps {
  bookId?: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

const BookForm = ({ bookId, onSuccess, onError, onCancel }: BookFormProps) => {
  const isEditMode = !!bookId;
  const { fetchBook, loading: fetchLoading } = useFetchBook();
  const [book, setBook] = useState<Book | null>(null);
  const { createBook, loading: createLoading } = useCreateBook();
  const { updateBook, loading: updateLoading } = useUpdateBook();
  const isLoading = fetchLoading || createLoading || updateLoading;
  const { setServerErrors } = useFormValidation();

  const form = useForm<BookFormValues>({
    defaultValues: {
      title: book?.title || '',
      author: book?.author || '',
    },
  });
  const { reset } = form;

  useEffect(() => {
    if (bookId) {
      fetchBook(bookId).then(setBook);
    }
  }, [bookId]);

  useEffect(() => {
    reset({
      title: book?.title || '',
      author: book?.author || '',
    });
  }, [book]);

  const onSubmit = async (data: BookFormValues) => {
    try {
      if (isEditMode) {
        const updateData: BookUpdateInput = {
          author: data.author
        };
        const result = await updateBook(book!.id, updateData);
        if (result && onSuccess) {
          onSuccess();
        }
      } else {
        const createData: BookCreateInput = {
          title: data.title,
          author: data.author
        };
        const result = await createBook(createData);
        if (result.success && onSuccess) {
          onSuccess();
        } else if (result.errors) {
          setServerErrors(result.errors, form.setError);
        }
      }
    } catch (err) {
      if (onError) {
        onError(err instanceof Error ? err.message : 'An error occurred');
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <InputForm
            label="Title"
            disabled={isEditMode}
            placeholder="Enter book title"
            className="mb-2"
            name="title"
            error={form.formState.errors.title?.message}
            validation={titleValidation}
          />
        </div>
        
        <div>
          <InputForm
            label="Author"
            placeholder="Enter author name"
            className="mb-2"
            name="author"
            error={form.formState.errors.author?.message}
            validation={authorValidation}
          />
        </div>
        
        <div className="flex justify-end space-x-2 pt-2">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            variant="default" 
            disabled={isLoading}
          >
            {isEditMode ? 'Update Book' : 'Add Book'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default BookForm;