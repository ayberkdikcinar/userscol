import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UsersPage from './pages/Users';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <UsersPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
