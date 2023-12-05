import NavContainer from "./navigations";
import Provider from "./context/Provider";
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from "react";
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Provider>
        <MenuProvider>
          <QueryClientProvider client={queryClient}>
            <NavContainer />
          </QueryClientProvider>
        </MenuProvider>
      </Provider>
      <Toast />
    </>
  );
}

export default App;

