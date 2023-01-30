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
  Flex
} from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const { isOpen, onClose} = useSidebarDrawer()
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
  return (
    <Box as="aside" w="48" mr="8">
      <SidebarNav />
      <Flex boxShadow='buttonShadow' my={4} mx='auto' alignItems='center'>
        <Text fontSize='xs' fontWeight="bold" letterSpacing="tight" w="64" bgGradient="linear(to-tr, green.300, gray.600, green.300 )" bgClip='text'>
          Desenvolvido pelo 3ªSgt Henry - 2016
        </Text>
      </Flex>
    </Box>
  );
}
