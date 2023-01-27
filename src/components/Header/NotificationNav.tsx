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
        bg="red.400"
        size="md"
        boxShadow="buttonShadow"
        color="whiteAlpha.900"
        _hover={{ bgColor: "red.600" }}
        onClick={() => signOut()}
        p="4"
      >
        <Icon boxSize={6} as={BsBoxArrowLeft} pr={2} />
        Sair
      </Button>
    </HStack>
  );
}
