import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Login from '@/features/Auth/Login/page';

const queryClient = new QueryClient()
const App = ()=> {

  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App;
