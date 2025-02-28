import BooksTable from './components/BooksTable';
import { Toaster } from 'react-hot-toast';

const BooksPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-white text-gray-900">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Book Management</h1>
      </div>
      <BooksTable/>
    </div>
  );
};

export default BooksPage;