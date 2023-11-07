import { Button, Flex, Grid, Icon } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { BsBoxArrowLeft } from "react-icons/bs";
import { MissaoModal } from "../Missao/Modal/Missao";
import { MissaoDrawer } from "../Missao/Drawer";


export function NotificationNav() {
  return (
    <Grid
    gridTemplateColumns={['1fr 1fr','1fr 1fr','1fr 1fr 1fr']}
    gap={2}
      py={1}
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
      ml='auto'
      pr={4}
    >
      {/* Colocar um condição para so ser acessivel o menu de missao para postos e grad acima de CB */}
      <MissaoDrawer />
      <MissaoModal />
      <Button
        bgGradient="linear(to-tr, red.900, gray.990, gray.990 )"
        size="md"
        boxShadow="buttonShadow"
        color="whiteAlpha.900"
        _hover={{ bgGradient: "linear(to-tr, red.900, red.800, gray.990 )", transition: 'top ease 0.5s'}}
        onClick={() => signOut()}
        p="4"
      >
        <Icon boxSize={6} as={BsBoxArrowLeft} pr={2} />
        
      </Button>
    </Grid>
  );
}
