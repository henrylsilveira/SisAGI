import { Center, Flex } from "@chakra-ui/react";
import styles from './styles.module.css'

export function NotLoaded({ compact }: { compact?: boolean }) {
  return (
    <Center p={compact ? 4 : 6} m={compact ? 2 : 2}>
      <Flex>
        <span className={styles.loader} />
      </Flex>
    </Center>
  )
}