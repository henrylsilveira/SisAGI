import { Button, HStack, Icon } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { BsBoxArrowLeft } from "react-icons/bs";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";


export function NotificationNav() {
  return (
    <HStack
      py={1}
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
      ml='auto'
      pr={4}
    >
      <Icon as={RiNotificationLine} fontSize={20} />
      {/* <Icon as={RiUserAddLine} fontSize={20} /> */}
      <Button
        bgGradient="linear(to-tr, red.900, gray.990, gray.990 )"
        size="md"
        boxShadow="buttonShadow"
        color="whiteAlpha.900"
        _hover={{ bgGradient: "linear(to-tr, red.900, red.800, gray.990 )", transition: 'top ease 0.5s'}}
        onClick={() => signOut()}
        p="4"
      >
        <Icon boxSize={6} as={BsBoxArrowLeft} pr={2} />
        Sair
      </Button>
    </HStack>
  );
}
