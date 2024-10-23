import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import apiCall from '../util/apiCall';
import { Link } from 'react-router-dom';

function AddComment () {  
	const [name, setName] = useState('');
  const [email, setEmail] = useState('');
	const [body, setBody] = useState('');
	const queryClient = useQueryClient();
  
  const commentMutation = useMutation({
		mutationFn: body => apiCall.post('/comments', body),
		mutationKey: 'create-comment',
    onSuccess: () => {
			queryClient.refetchQueries('get-comments');
			setName('');
      setEmail('');
      setBody('');
		},
		onError: error => {
			alert(error.response?.data?.message ?? error?.message);
		},	});

	const handleSubmit = e => {
		e.preventDefault();
		commentMutation.mutate({ name, email, body, userId: 1 });
	};

  return (
    <section>
      <Link to='/'>Back</Link>
      <h1>Create a Comment</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input value={name} name='name' onChange={e => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Email
            <input value={email} name='email' onChange={e => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Comment
            <textarea value={body} name='body' onChange={e => setBody(e.target.value)}></textarea>
          </label>
          <br />
          <button disabled={commentMutation.isPending}> {commentMutation.isPending ? 'Creating...' : 'Create Comment'}</button>
        </form>
    </section>
  );
};

export default AddComment;
