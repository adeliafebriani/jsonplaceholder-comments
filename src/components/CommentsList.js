import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation  } from '@tanstack/react-query';
import apiCall from '../util/apiCall';

function CommentsList() {
	const [name, setName] = useState('');
	const queryClient = useQueryClient();

	const { data, isLoading, error } = useQuery({
		queryKey: 'get-comments',
		queryFn: () => apiCall.get('/comments'),
		retry: 0,
		refetchOnWindowFocus: false,
	});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Comments List</h1>
      <Link to='/add-comment'>Add Comment</Link>
      <ol className='list'>
				{data?.data?.length > 0 && data?.data?.map(({ name, id }) => (
						<li key={id}>
							<Link to={`/comments/${id}`}>{name}</Link>
						</li>
					))}
			</ol>
    </div>
  );
};

export default CommentsList;
