import { Flex, Avatar, Box, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <>
          <Box mr="4" textAlign="right">
            <Text> Henry Leao</Text>
            <Text color="gray.300" fontSize="small">
              henrylsilveira@gmail.com
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
