import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Login from '@/features/Auth/Login/page';
import AuthProvider from '@/features/Auth/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient()
const App = ()=> {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
      </BrowserRouter>
    <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App;
