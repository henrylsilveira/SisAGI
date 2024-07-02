import { Flex, Avatar, Box, Text, Tag, TagCloseButton, TagLabel, VStack, Badge, AvatarBadge } from "@chakra-ui/react";

import { api } from "../../services/api";
import { returnAvatarImage } from "../../utils/scripts";
import { useSession } from "../../services/context/auth";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user: session } = useSession();
  return (
    <Flex align="center">
      {showProfileData && (
        <>
          <Flex mr="4" textAlign="right" flexDirection='column' alignItems='end' borderLeftWidth={1} pl={6}
      borderColor="gray.700">
            <Text>{session?.nome_completo}</Text>
            <Tag
            size='sm'
                borderRadius='base'
                variant='solid'
                colorScheme='green'
                my='0.5'
                alignItems='center'
                boxShadow="buttonShadow"
              >
                <TagLabel  fontWeight='bold'>{session?.post_grad  + ' ' + session?.nome_guerra}</TagLabel>
              </Tag>
              <Tag
              size='sm'
                borderRadius='base'
                variant='solid'
                colorScheme='blue'
                boxShadow="buttonShadow"
              >
                <TagLabel  pr='2'> { session?.companhia } / {session?.pelotao}</TagLabel>
              </Tag>
          </Flex>
          
        </>
      )}
      <Flex flexDirection='column' alignItems='center'>
      <Avatar
            boxShadow="buttonShadow"
            size="lg"
            name={session?.nome_completo}
            bg='green.700'
            src={returnAvatarImage(session?.avatar_url)}
          >
            <AvatarBadge borderColor='gray.990' boxSize='1.1em' bg='green.500' />
          </Avatar>
          {!showProfileData && ( 
             <Badge variant="outline" colorScheme="yellow" mx='auto' zIndex="base">
             {session?.companhia } / {session?.pelotao}
               </Badge>
          )}
      </Flex>
    </Flex>
  );
}
