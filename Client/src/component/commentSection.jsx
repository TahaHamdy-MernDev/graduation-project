import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const CommentSection = ({ onCommentSubmit,placeholder,buttonText }) => {
  const [comment, setComment] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  // const handleCommentChange = (e) => {
  //   setComment(e.target.value);
  // };

  const onSubmit = (data) => {
    onCommentSubmit(data.comment);
    setComment('');
    setValue('comment','');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="comment mb-2">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={placeholder}
            className={`form-control ${errors.comment ? 'is-invalid' : ''}`}
            {...register("comment", { required: true })}
          />
        </Form.Group>
        <Button variant="primary" className='mt-2' type="submit">
        {buttonText}
        </Button>
      </Form>
    </div>
  );
};

export default CommentSection;