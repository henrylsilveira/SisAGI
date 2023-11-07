import { Center, Flex } from "@chakra-ui/react";
import styles from './styles.module.css'

export function NotLoaded() {
  return (
    <Center p={6} m={2}>
      <Flex>
        <span className={styles.loader} />
      </Flex>
    </Center>
  )
}