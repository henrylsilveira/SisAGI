import { Text } from '@chakra-ui/react'

export function Logo() {
  return (
    <>
      <Text fontSize={["lg", "2xl"]} fontWeight="bold" letterSpacing="tight" w="64">
        Sistemas de Apoio a Gestão Interna
        <Text as="span" ml="1" color="green.500">
          .
        </Text>
      </Text>
    </>
  );
}
