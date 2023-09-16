import { Flex, Icon, IconButton, useBreakpointValue, useToast } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationNav } from "./NotificationNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";
import { Functions } from "./Functions";
import Router from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function Header() {
  const { onOpen } = useSidebarDrawer();
  const { data: session, status } = useSession()
  const toast = useToast()

  useEffect(() => {
    if(!session || status !== 'authenticated') {
        toast({
          title: 'Autenticação inválida.',
          description: `Seu token de acesso venceu, realize o login novamente. `,
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
        Router.push('/')
      }
}, [session, status])

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mt="4"
      px="6"
      mx='auto'
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open Navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}
      <Logo />
      <Flex align="center" ml="auto">
        <NotificationNav />
        <Functions />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
