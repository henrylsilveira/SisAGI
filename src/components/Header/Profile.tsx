import { Flex, Avatar, Box, Text, Tag, TagCloseButton, TagLabel, VStack, Badge, AvatarBadge } from "@chakra-ui/react";
import { useSession } from 'next-auth/react';
import { api } from "../../services/api";
import { returnAvatarImage } from "../../utils/scripts";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { data: session } = useSession()
  return (
    <Flex align="center">
      {showProfileData && (
        <>
          <Flex mr="4" textAlign="right" flexDirection='column' alignItems='end' borderLeftWidth={1} pl={6}
      borderColor="gray.700">
            <Text>{session?.militar.nome_completo}</Text>
            <Tag
            size='sm'
                borderRadius='base'
                variant='solid'
                colorScheme='green'
                my='0.5'
                alignItems='center'
                boxShadow="buttonShadow"
              >
                <TagLabel  fontWeight='bold'>{session?.militar.post_grad  + ' ' + session?.militar.nome_guerra}</TagLabel>
              </Tag>
              <Tag
              size='sm'
                borderRadius='base'
                variant='solid'
                colorScheme='blue'
                boxShadow="buttonShadow"
              >
                <TagLabel  pr='2'> { session?.militar.companhia } / {session?.militar.pelotao}</TagLabel>
              </Tag>
          </Flex>
          
        </>
      )}
      <Flex flexDirection='column' alignItems='center'>
      <Avatar
            size="lg"
            name={session?.militar.nome_completo}
            bg='green.700'
            src={returnAvatarImage(session?.militar.avatar_url)}
          >
            <AvatarBadge borderColor='gray.990' boxSize='1.1em' bg='green.500' />
          </Avatar>
          {!showProfileData && ( 
             <Badge variant="outline" colorScheme="yellow" mx='auto' zIndex='toast' >
             { session?.militar.companhia } / {session?.militar.pelotao}
               </Badge>
          )}
      </Flex>
    </Flex>
  );
}
