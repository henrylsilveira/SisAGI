import { useToast ,Box, useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, FormLabel, InputGroup, InputLeftAddon, InputRightAddon, Select, Textarea, DrawerFooter, FormControl, Flex, VStack, HStack } from "@chakra-ui/react"
import React from "react"
import { FiX } from 'react-icons/fi'
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Municao } from "../../../@types/types"
import { api } from "../../../services/api";
import { Input } from "../../Form/Input";
import { convertDate, generateNowISOTime } from '../../../utils/scripts';

const signInFormSchema = yup.object().shape({
    municaoUsada: yup.number().required("Obrigatório").typeError('Somente número'),
    municaoDevolvida: yup.number().required("Obrigatório").typeError('Somente número'),
  });

export function DrawerFurriel({data}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const toast = useToast()
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<Municao> = async (values) => {
    values = {
        ...values,
        data_devolucao: generateNowISOTime(),
        id: data.id
    }

    try {
      const result = await api.post('/furriel/municao/encerrar', values )
      if(result.status == 201) {
          toast({
          title: 'Munição',
          description: "Pedido de munição encerrado.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        onClose
      }
    } catch (error) {
      toast({
        title: 'Militar não cadastrado.',
        description: "Verifique os dados do militar.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
    
  };

    return (
      <>
        <Button leftIcon={<FiX />} colorScheme='teal' size='sm' onClick={onOpen}>
          Encerrar
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent bg='gray.900'>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px' borderColor='gray.700'>
              Encerrar pedido de munição
            </DrawerHeader>
            <Box as='form' onSubmit={handleSubmit(handleSignIn)}>
            <DrawerBody>
              <Stack spacing='24px'>
                <Box>
                  <FormControl>
                    <Input
                      size="sm"
                      borderColor='gray.700'
                      htmlSize={2}
                      rounded="lg"
                      label="Munição usada"
                      type="text"
                      name="municaoUsada"
                      error={errors.municaoUsada}
                      {...register("municaoUsada")}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <Input
                      size="sm"
                      borderColor='gray.700'
                      htmlSize={2}
                      rounded="lg"
                      label="Munição devolvida"
                      type="text"
                      name="municaoDevolvida"
                      error={errors.municaoDevolvida}
                      {...register("municaoDevolvida")}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <Input
                      size="sm"
                      borderColor='gray.700'
                      htmlSize={2}
                      rounded="lg"
                      label="Data devolução"
                      type="text"
                      value={convertDate(Date.now())}
                      name="dataDevolucao"
                    />
                  </FormControl>
                </Box>
              </Stack>
            </DrawerBody>
  
            <DrawerFooter position='absolute' w='full' bottom='0' borderTopWidth='1px' borderColor='gray.700'>
              <Button colorScheme='green' _hover={{ bg: 'green.600', color: 'white', borderColor: 'green.500'}} variant='outline' type="submit" w='full' isLoading={formState.isSubmitting}>Fechar pedido</Button>
            </DrawerFooter>
            </Box>
          </DrawerContent>
        </Drawer>
      </>
    )
  }