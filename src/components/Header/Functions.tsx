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
  Grid,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FuncaoMilitar } from "../../@types/types";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Functions({ showProfileData = true }: ProfileProps) {
  const { data: session } = useSession();
  const colors = ['green', 'yellow', 'blue','red','orange', 'gray', 'green', 'purple'];
  // console.log(colors[Math.floor(Math.random() * colors.length)])
  return (
    <Flex flexDirection="column" mx="auto" px={4}>
      {showProfileData && (
        <>
            <Flex boxShadow="buttonShadow" bgGradient="linear(to-tr, gray.990, gray.990, green.900)" rounded={4} px={4} py='0.5' w='full' mb={4}>
              <Text fontSize='xs' mx='auto' fontWeight='bold'>
                FUNÇÕES
              </Text>
            </Flex>
            <Grid gridTemplateColumns='1fr 1fr'>
              {session?.militar.Funcao.filter((func: FuncaoMilitar, index) => {return func.status === 'ativo'}).map((func, index) =>(
                <Badge key={`${func}-${index}`} textAlign='center' variant="outline" colorScheme={colors[Math.floor(Math.random() * colors.length)]} mx={1} mb={1}>
                  {func.funcao}
                </Badge>
              ))}
            </Grid>
        
        </>


      )}
    </Flex>
  );
}
