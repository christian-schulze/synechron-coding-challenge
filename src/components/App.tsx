import { QueryClient, QueryClientProvider } from "react-query";

import { People } from "@/components/People.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <People />
    </QueryClientProvider>
  );
}

export default App;
