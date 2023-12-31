import React, { useState } from 'react';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', resource: '' });
 const [items,setItems]=useState([ ]);
  const handleAddBook = () => {
    setBooks([...books, newBook]);
    setNewBook({ title: '', author: '' , resource: ''});
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const handleEditBook = (index, updatedBook) => {
    const updatedBooks = [...books];
    updatedBooks[index] = updatedBook;
    setBooks(updatedBooks);
  };
  const [data, setData] = useState([
    { id: 1, name: 'جافاسكريبت' , author:'اسحاق' , resource:'اكاديمية حوسب'},
    { id: 2, name: 'علوم الحاسوب' , author:'اسحاق' , resource:'اكاديمية حوسب'},
    { id: 3, name: 'البرمجة للمبتدئين' , author:'اسحاق' , resource:'اكاديمية حوسب' }
  ]);
  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  };
  return (
    <div  className="table-div">
      <table>
        <thead>
          <tr>
            <th>العنوان</th>
            <th>المؤلف</th>
            <th>المرجع</th>
          </tr>
        
        </thead>
      
        <tbody>
           {data.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.author}</td>
            <td>{item.resource}</td>
            
            <td>
              <button onClick={() => handleDelete(item.id)}>احذف</button>
            </td>
          </tr>
        ))}
          
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.resource}</td>
              <td>
                <button onClick={() => handleDeleteBook()}>حذف</button>
                <button onClick={() => handleEditBook(index, { title: 'Updated Title', author: 'Updated Author' })}>
                  تعديل
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div  className="form-book">
        <input
          type="text"
          placeholder="عنوان الكتاب"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="اسم المؤلف"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="المراجع"
          value={newBook.resource}
          onChange={(e) => setNewBook({ ...newBook, resource: e.target.value })}
        />
        <button onClick={handleAddBook}>اضافة كتاب</button>
      </div>
    </div>
  );
};

export default BookTable;