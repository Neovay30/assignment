import { Modal } from "../../../components/ui/Modal";
import BookForm from "./BookForm";

interface BookFormModalProps {
    onClose: () => void;
    bookId?: number;
    onSuccess: () => void;
    onError: (error: string) => void;
}

const BookFormModal = ({ onClose, bookId, onSuccess, onError }: BookFormModalProps) => {
    const isEditMode = !!bookId;
    
    return (
        <Modal
            onClose={onClose}
            title={isEditMode ? 'Edit Book' : 'Add New Book'}
        >
            <BookForm
                key={isEditMode ? `edit-${bookId}` : 'create-new'}
                bookId={bookId}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}
            />
        </Modal>
    );
};

export default BookFormModal;