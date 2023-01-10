import { Box, Text, Stack, Link, Icon, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavSectionProps {
    title: string;
    children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <Heading fontWeight="bold" color="gray.400" fontSize="sm">
        {title}
      </Heading>
      <Stack spacing={1} >
        {children}
      </Stack>
    </Box>
  );
}
