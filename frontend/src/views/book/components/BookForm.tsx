import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Book, BookCreateInput, BookUpdateInput } from '../../../types/book';
import Button from '../../../components/ui/Button';
import { FormInput } from '../../../components/ui/FormInput';
import { useFetchBook } from '../hooks/useFetchBook';
import { useCreateBook } from '../hooks/useCreateBook';
import { useUpdateBook } from '../hooks/useUpdateBook';
import { titleValidation, authorValidation } from '../constants/validationRules';
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

  const form = useForm<BookCreateInput | BookUpdateInput>({
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

  const onSubmit = async (data: BookCreateInput | BookUpdateInput) => {
    try {
      if (isEditMode) {
        const result = await updateBook(book!.id, data as BookUpdateInput);
        if (result && onSuccess) {
          onSuccess();
        }
      } else {
        const result = await createBook(data as BookCreateInput);
        if (result && onSuccess) {
          onSuccess();
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
          <FormInput
            label="Title"
            disabled={isEditMode}
            placeholder="Enter book title"
            className="mb-2"
            {...form.register('title', titleValidation)}
          />
        </div>
        
        <div>
          <FormInput
            label="Author"
            placeholder="Enter author name"
            className="mb-2"
            {...form.register('author', authorValidation)}
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