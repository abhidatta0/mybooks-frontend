import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom';
import router from '@/libs/app/routing';

const queryClient = new QueryClient()
const App = ()=> {

  return (
    <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer />
        <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App;
