import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const Question = ({ answer, onReply, onVote }) => {
  const [newReply, setNewReply] = useState('');

  const handleReply = () => {
    onReply(answer._id, newReply);
    setNewReply('');
  };

  return (
    // <Card>
    //   <Card.Body>
    //     <Card.Text>{comment.text}</Card.Text>
    //     <Button variant="primary" onClick={() => onVote(comment.id)}>
    //       Vote
    //     </Button>
    //     <Form.Group className="mt-2">
    //       <Form.Control
    //         type="text"
    //         placeholder="Reply..."
    //         value={newReply}
    //         onChange={(e) => setNewReply(e.target.value)}
    //       />
    //       <Button variant="info" className="mt-2" onClick={handleReply}>
    //         Reply
    //       </Button>
    //     </Form.Group>
    //     {comment.replies && comment.replies.length > 0 && (
    //       <div className="mt-3">
    //         <h6>Replies:</h6>
    //         {comment.replies.map((reply) => (
    //           <Comment key={reply.id} comment={reply} onReply={onReply} onVote={onVote} />
    //         ))}
    //       </div>
    //     )}
    //   </Card.Body>
    // </Card>
    <Card>
    <Card.Body>
      <Card.Text>{answer.text}</Card.Text>
      <Button variant="primary" onClick={() => onVote(answer._id)}>
        Vote
      </Button>
      <Form.Group className="mt-2">
        <Form.Control
          type="text"
          placeholder="Reply..."
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />
        <Button variant="info" className="mt-2" onClick={handleReply}>
          Reply
        </Button>
      </Form.Group>
      {answer.replies && answer.replies.length > 0 && (
        <div className="mt-3">
          <h6>Replies:</h6>
          {answer.replies.map((reply) => (
            <Comment key={reply._id} answer={reply} onReply={onReply} onVote={onVote} />
          ))}
        </div>
      )}
    </Card.Body>
  </Card>
  );
};

export default Question;