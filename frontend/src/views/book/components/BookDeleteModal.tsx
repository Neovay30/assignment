import { Modal } from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

interface BookDeleteModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

const BookDeleteModal = ({ onClose, onConfirm }: BookDeleteModalProps) => {
    return (
        <Modal
            onClose={onClose}
            title="Confirm Delete"
        >
            <p>Are you sure you want to delete this book?</p>
            <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={onConfirm}>
                    Delete
                </Button>
            </div>
        </Modal>
    );
};

export default BookDeleteModal;