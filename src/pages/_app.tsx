import { AppProps } from "next/app";
import { Center, ChakraProvider, Flex } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "../services/queryClient";
import { SessionProvider, useSession } from "next-auth/react";
import { DotLoader } from "react-spinners";
import { Sidebar } from "../components/Sidebar";
import { useRouter } from "next/router";
import { Header } from "../components/Header";


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <Auth>
            <SidebarDrawerProvider>
              {router.asPath == "/" || router.asPath == "/cadastro" ? (
                <Component {...pageProps} />
              ) : (
                  <Flex direction="column" h="100vh" mx="auto">
                    <Header />
                    <Flex w="100%" my={6} maxWidth={1480} mx="auto" px="6">
                      <Sidebar />
                      <Component {...pageProps} />
                    </Flex>
                  </Flex>
              )}
            </SidebarDrawerProvider>
          </Auth>
        </SessionProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession();

  if (status === "loading") {
    return (
      <Center h="100vh">
        <DotLoader size={64} color="#55DD55" />
      </Center>
    );
  }
  return children;
}

export default MyApp;
