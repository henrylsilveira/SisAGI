import { Text } from '@chakra-ui/react'
import Link from 'next/link';

export function Logo() {
  return (
    <>
      <Text fontSize={["lg", "2xl"]} fontWeight="bold" letterSpacing="tight" w="64" bgGradient="linear(to-tr, green.300, gray.600, green.300 )" bgClip='text'>
        <Link href="/dashboard">SisAGI - Sistemas de Apoio a Gestão Interna</Link>
      </Text>
    </>
  );
}
