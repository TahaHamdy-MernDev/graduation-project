import React, { useState } from 'react';

const CourseTable = () => {
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
    { id: 1, name: 'جافاسكريبت' , author:'هيفاء ابوالرب' , resource:'340$'},
    { id: 2, name: 'علوم الحاسوب' , author:'احمد حسام' , resource:'600$'},
    { id: 3, name: 'البرمجة للمبتدئين' , author:'اسلام محمد' , resource:' 200$' }
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
            <th>اسم الدورة</th>
           <th>اسم المحاضر</th>
          <th>سعر الدورة</th>
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
          placeholder="عنوان الدورة"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="اسم المحاضر"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="سعر الدورة"
          value={newBook.resource}
          onChange={(e) => setNewBook({ ...newBook, resource: e.target.value })}
        />
        <button onClick={handleAddBook}>اضافة دورة
        </button>
      </div>
    </div>
  );
};

export default CourseTable;