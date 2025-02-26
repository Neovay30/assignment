import { Modal } from "../../../components/ui/Modal";
import BookForm from "./BookForm";

interface BookFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookId?: number;
    onSuccess: () => void;
    onError: (error: string) => void;
}

const BookFormModal = ({ isOpen, onClose, bookId, onSuccess, onError }: BookFormModalProps) => {
    const isEditMode = !!bookId;
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? 'Edit Book' : 'Add New Book'}
        >
            {isOpen && (
                <BookForm
                    key={isEditMode ? `edit-${bookId}` : 'create-new'}
                    bookId={bookId}
                    onSuccess={onSuccess}
                    onError={onError}
                    onCancel={onClose}
                />
            )}
        </Modal>
    );
};

export default BookFormModal;