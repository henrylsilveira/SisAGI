import { Flex, Avatar, Box, Text } from "@chakra-ui/react";
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
          <Box mr="4" textAlign="right">
            <Text>{session?.militar.nome_completo}</Text>
            <Text color="gray.300" fontSize="small">
              {session?.militar.nome_guerra} - { session?.militar.local }
            </Text>
            <Text color="gray.300" fontSize="small">
              {session?.militar.funcao_local}
            </Text>
          </Box>
          
        </>
      )}
      <Avatar
            size="md"
            name="Henry Leao"
            src="https://github.com/henrylsilveira.png"
          />
    </Flex>
  );
}
