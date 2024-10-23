import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/store';
import { queryClient } from './queryClient';
import CommentsList from './components/CommentsList';
import CommentDetail from './components/CommentDetail';
import AddComment from './components/AddComment';

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<CommentsList />} />
            <Route path="/comments/:id" element={<CommentDetail />} />
            <Route path="/add-comment" element={<AddComment />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
    
  );
};

export default App;
