import { AppProps } from "next/app";
import { Center, ChakraProvider, Flex, Image } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "../services/queryClient";

import { DotLoader } from "react-spinners";
import { Sidebar } from "../components/Sidebar";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import '../styles/global.css'
import { NotLoaded } from "../components/NotLoaded";
import { Logo } from "../components/Header/Logo";

import { AuthProvider, useSession } from "../services/context/auth";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        {/* <SessionProvider session={session}> */}
        <AuthProvider>
          <Auth>
            <SidebarDrawerProvider>
              {router.asPath == "/" || router.asPath == "/cadastro" ? (
                <Component {...pageProps} />
              ) : (
                  <Flex direction="column" h="100vh" mx="auto">
                    <Header />
                    <Flex w="100%" my={6} mx="auto" px="4">
                      <Sidebar />
                      <Component {...pageProps} />
                    </Flex>
                  </Flex>
              )}
            </SidebarDrawerProvider>
          </Auth>
          </AuthProvider>
        {/* </SessionProvider> */}
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { user: session } = useSession();
  // if (session) {
  //   return (
  //     <Center flexDirection="column" h="100vh">
  //       <Image w="56" src="./img/logo3.png" alt="SisAGI" />
  //       <NotLoaded />
  //     </Center>
  //   );
  // }
  return children;
}

export default MyApp;
