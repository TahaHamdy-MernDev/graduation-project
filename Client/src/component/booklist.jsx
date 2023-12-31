import React, { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // قم بإضافة الكود هنا لاسترجاع الكتب الموجودة وتحديث الحالة books
  }, []);

  const handleDelete = (bookId) => {
    // قم بإضافة الكود هنا لحذف الكتاب باستخدام bookId
  };

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <span>{book.title} - {book.author}</span>
          <button onClick={() => handleDelete(book.id)}>حذف</button>
        </li>
      ))}
    </ul>
  );
};

export default BookList;