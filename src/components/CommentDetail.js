import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchComment = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`);
  return response.json();
};

const CommentDetail = () => {
  const { id } = useParams();
  const { data: comment, isLoading, error } = useQuery({
    queryKey: ['comment', id],
    queryFn: fetchComment,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Link to='/'>Back</Link>
      <h2>Comment Detail</h2>
      <p>Id: {comment.id}</p>
      <p>Name: {comment.name}</p>
      <p>Email: {comment.email}</p>
      <p>Body: {comment.body}</p>
    </div>
  );
};

export default CommentDetail;
