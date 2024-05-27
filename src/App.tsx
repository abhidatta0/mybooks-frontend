import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
const App = ()=> {

  return (
    <QueryClientProvider client={queryClient}>
    <div className="text-3xl font-bold underline">
      Hello App
    </div>
    <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App;
