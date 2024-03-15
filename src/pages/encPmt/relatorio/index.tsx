
import {
    Box,
    Flex,
    SimpleGrid,
    useToast,
  } from "@chakra-ui/react";
  
  import { useSession } from "next-auth/react";
  
  export default function RelatorioPmt() {
    const { data: session } = useSession();
   
    const toast = useToast();

  
    return (
      <Flex direction="column" flex="1" gap={4}>
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
          
  
          </Box>
        </SimpleGrid>
      </Flex>
    );
  }
  