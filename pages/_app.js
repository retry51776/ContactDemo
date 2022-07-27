import "../styles/globals.css";
import "regenerator-runtime/runtime";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { theme, ThemeProvider } from "@chakra-ui/core";

const queryClient = new QueryClient();

function AddressDemo({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ThemeProvider them={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default AddressDemo;
