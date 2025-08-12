import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
  Text,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer()
  const [stateBar, setStateBar] = useState(false)
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.990" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  function sideBarFunction() {

    const sidebar = document.getElementById("sidebar")
    const buttonSidebar = document.getElementById("buttonSidebar")

    if (sidebar.style.display !== "block") {
      setStateBar(false)
      sidebar.style.display = "block"
      buttonSidebar.style.position = "initial"
    } else {
      setStateBar(true)
      sidebar.style.display = "none"
      buttonSidebar.style.position = "absolute"
    }
  }
  return (
    <>
      <Flex flexDir="column">
        <Button
          position="absolute"
          gap={2}
          id="buttonSidebar"
          w="20"
          bg="gray.990"
          size="sm"
          border="1px"
          textColor="white"
          borderColor="green.700"
          _hover={{ border: "1px", borderColor: "green.700" }}
          onClick={() => sideBarFunction()}
          py="1"
          boxShadow="buttonShadow"
        >
          <Icon as={IoMdEye} size={20} />
          <Text>Menu</Text>
        </Button>


        <Box id="sidebar" as="aside" w="48" mr="8" display="none">
          <SidebarNav />
          <Flex boxShadow='buttonShadow' my={4} alignItems='center' w='full' bg='blackAlpha.500' rounded='lg'>
            <Text fontSize='xs' fontWeight="bold" letterSpacing="tight" bgGradient="linear(to-tr, green.300, gray.600, green.300 )" bgClip='text' p={2} w='full'>
              Desenvolvido e projetado pelo 2ªSgt Henry - 2016
            </Text>
          </Flex>


        </Box>
      </Flex>
      {stateBar ? (
        <Flex position="fixed" zIndex={100} bottom={0} left={5} boxShadow='buttonShadow' my={4} mx="auto" alignItems='center' bg='blackAlpha.400' rounded='lg'>
          <Text fontSize='xs' align="center" fontWeight="bold" letterSpacing="tight" bgGradient="linear(to-tr, green.300, gray.600, green.300 )" bgClip='text' p={2} w='full'>
            SisAGI - Desenvolvido e projetado pelo 2ªSgt Henry - 2016
          </Text>
        </Flex>
      ) : null}
    </>
  );
}
