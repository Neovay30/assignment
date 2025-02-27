export const titleValidation = {
    required: 'Title is required',
    minLength: {
      value: 2,
      message: 'Title must be at least 2 characters',
    },
    maxLength: {
      value: 100,
      message: 'Title cannot exceed 100 characters',
    },
  };
  
export const authorValidation = {
    required: 'Author is required',
    minLength: {
      value: 2,
      message: 'Author must be at least 2 characters',
    },
    maxLength: {
      value: 50,
      message: 'Author name cannot exceed 50 characters',
    },
  };