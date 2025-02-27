export const CSV_EXAMPLES = {
  both: `title,author
To Kill a Mockingbird,Harper Lee
1984,George Orwell
The Great Gatsby,F. Scott Fitzgerald
Pride and Prejudice,Jane Austen`,
  titleOnly: `title
To Kill a Mockingbird
1984
The Great Gatsby
Pride and Prejudice`,
  authorOnly: `author
Harper Lee
George Orwell
F. Scott Fitzgerald
Jane Austen`
};

export const XML_EXAMPLES = {
  both: `<?xml version="1.0"?>
<books>
  <book><title>To Kill a Mockingbird</title><author>Harper Lee</author></book>
  <book><title>1984</title><author>George Orwell</author></book>
</books>`,
  titleOnly: `<?xml version="1.0"?>
<books>
  <book><title>To Kill a Mockingbird</title></book>
  <book><title>1984</title></book>
</books>`,
  authorOnly: `<?xml version="1.0"?>
<books>
  <book><author>Harper Lee</author></book>
  <book><author>George Orwell</author></book>
</books>`
}; 