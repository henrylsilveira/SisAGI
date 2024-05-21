import {
  useDisclosure,
  Button,
  useToast,
  Icon,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useQuery } from "react-query";
import {
  MissaoArray,
} from "../../../@types/types";
import { api } from "../../../services/api";
import { RiNotificationLine } from "react-icons/ri";
import { CardMissao } from "./CardMissao";
import { useSession } from "../../../services/context/auth";

export function MissaoDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user: session } = useSession();
  const toast = useToast();

  const [result, setResult] = useState<MissaoArray>();
  const btnRef = React.useRef();

  useQuery(["todasMissoesMilitar"], async () => {
    const result = await api.get<MissaoArray>(`/missao/${session.id}`);
    setResult(result.data);
  });

  return (
    <>
      <Button
        bg="gray.990"
        size="md"
        _hover={{ border: "1px", borderColor: "green.700" }}
        // onClick={onOpen}
        py="1"
        boxShadow="buttonShadow"
        ref={btnRef}
      >
        <Icon color="white" as={RiNotificationLine} size={20} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.990" boxShadow="buttonShadow">
          <DrawerCloseButton />
          <DrawerHeader mx="auto" textTransform="uppercase">
            Missões
          </DrawerHeader>
          <Divider borderColor="green.700" />
          <DrawerBody>
            <CardMissao missoes={result} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
