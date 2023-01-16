import { Flex, Avatar, Box, Text, Tag, TagCloseButton, TagLabel, VStack, Badge } from "@chakra-ui/react";
import { useSession } from 'next-auth/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Functions({ showProfileData = true }: ProfileProps) {
  const { data: session } = useSession()
  return (
    <Flex align="center" >
      {showProfileData && (
        <>
          <Flex mr="4" textAlign="right" flexDirection='column' alignItems='end' >
            Funções do militar
          </Flex>
        </>
      )}
    </Flex>
  );
}
