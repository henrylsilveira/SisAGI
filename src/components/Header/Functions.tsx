import {
  Flex,
  Avatar,
  Box,
  Text,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Functions({ showProfileData = true }: ProfileProps) {
  const { data: session } = useSession();
  return (
    <Flex flexDirection="column" mx="auto" px={4}>
      {showProfileData && (

        <>
            <Flex boxShadow="buttonShadow" bg='green.900' rounded={4} px={4} py={1} mx="auto" mb={2} >
              FUNÇÕES
            </Flex>
            <Flex flexDirection="row">
              <Badge variant="outline" colorScheme="green" mx={1}>
                ENC MAT
              </Badge>
              <Badge variant="outline" colorScheme="blue" mx={1}>
                SGTEA
              </Badge>
              <Badge variant="outline" colorScheme="yellow" mx={1}>
                FURRIEL
              </Badge>
            </Flex>
        
        </>


      )}
    </Flex>
  );
}
