import { Flex, Avatar, Box, Text, Tag, TagCloseButton, TagLabel, VStack, Badge } from "@chakra-ui/react";
import { useSession } from 'next-auth/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { data: session } = useSession()

  return (
    <Flex align="center">
      {showProfileData && (
        <>
          <Flex mr="4" textAlign="right" flexDirection='column' alignItems='end'>
            <Text>{session?.militar.nome_completo}</Text>


            <Tag
            size='sm'
                borderRadius='full'
                variant='solid'
                colorScheme='green'
                my='0.5'
                alignItems='center'
              >
                <TagLabel fontWeight='bold'>{session?.militar.nome_guerra}</TagLabel>
                
              </Tag>
              
              <Tag
              size='sm'
                borderRadius='full'
                variant='solid'
                colorScheme='blue'
              >
                <TagLabel pr='2'> { session?.militar.local } / {session?.militar.pelotao}</TagLabel>
                <Badge variant='outline' colorScheme='yellow' >
          {session?.militar.funcao_local}
  </Badge>
              </Tag>
          </Flex>
          
        </>
      )}
      <Flex flexDirection='column'>

      <Avatar
            size="lg"
            name="Henry Leao"
            src="https://github.com/henrylsilveira.png"
          />
          
         
      </Flex>
    </Flex>
  );
}
