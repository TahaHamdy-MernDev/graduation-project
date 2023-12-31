// import  { useState } from 'react';
// import { Container, Form, Button } from 'react-bootstrap';
// import Comment from './comment';

// const DefaultComponent = () => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   const handleAddComment = () => {
//     const newCommentObj = {
//       id: comments.length + 1,
//       text: newComment,
//       replies: [],
//     };
//     setComments([...comments, newCommentObj]);
//     setNewComment('');
//   };

//   const handleReply = (parentId, replyText) => {
//     const updatedComments = comments.map((comment) => {
//       if (comment.id === parentId) {
//         const newReply = { id: comment.replies.length + 1, text: replyText };
//         return { ...comment, replies: [...comment.replies, newReply] };
//       }
//       return comment;
//     });
//     setComments(updatedComments);
//   };

//   const handleVote = (commentId) => {
//   };

//   return (
//     <Container>
//       <h3>Comments Section</h3>
//       <Form.Group>
//         <Form.Control
//           as="textarea"
//           rows={3}
//           placeholder="Add a new comment..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <Button variant="primary" className="mt-2" onClick={handleAddComment}>
//           Add Comment
//         </Button>
//       </Form.Group>
//       {comments.map((comment) => (
//         <Comment key={comment.id} comment={comment} onReply={handleReply} 
//         onVote={handleVote}
//          />
//       ))}
//     </Container>
//   );
// };

// export default DefaultComponent;
