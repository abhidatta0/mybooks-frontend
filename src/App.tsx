import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom';
import router from '@/libs/app/routing';
import AppBootstrap from './libs/app/Bootstrap';

const queryClient = new QueryClient()
const App = ()=> {

  return (
    <QueryClientProvider client={queryClient}>
        <AppBootstrap>
          <RouterProvider router={router} />
          <ToastContainer />
        </AppBootstrap>
        <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App;
