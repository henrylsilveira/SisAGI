import { Flex, Heading, Button, FormControl, FormHelperText, Box, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FcAcceptDatabase } from "react-icons/fc";
import { AtribuirFuncao } from "./AtribuirFuncao";
import { Militar } from "../../../@types/types";
import { convertISODateToInputValue } from "../../../utils/scripts";
import { ListarFuncao } from "./ListarFuncao";
import { Input } from "../../Form/Input";
import { api } from "../../../services/api";
import { FormEvent } from "react";
import { useRouter } from "next/router";

export function DadosMilitares(props) {
  const { data: session } = useSession();
  const { asPath } = useRouter();
    const mil = props.militar as Militar;
    const toast = useToast()

    async function handleSubmitForm(inputObject: {name: string, value: string}, id: string, e: FormEvent){
      if(inputObject.name == "data_praca" && inputObject.value !== ""){
        inputObject.value = `${inputObject.value}T00:00:00.000Z`
      }
      
      e.preventDefault();
      try {
        const result = await api.post('/militar/dados', {...inputObject, id} )
        if(result.status == 201) {
            toast({
            title: 'Militar',
            description: "Dados atualizados.",
            status: 'success',
            duration: 1000,
            isClosable: true,
          })
        }else {
          toast({
          title: 'Militar',
          description: "Dados não atualizados.",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
        }
      } catch (error) {
        toast({
          title: 'Militar',
          description: "Erro interno",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    }
  
    return (
      <Flex
        bgGradient="linear(to-tr, gray.990, gray.990, green.900)"
        boxShadow="innerShadow"
        rounded="lg"
        transition="ease-in-out"
        w="100%"
        flexDirection="column"
      >
        <Flex
          bg="gray.990"
          boxShadow="buttonShadow"
          m={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="md" p={2}>
            Dados Militares
          </Heading>
        </Flex>
        <Box m="auto" w="100%" h="100%" px={4} pb={4}>
          <FormControl>
            <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin/usuarios" ? false : true}
              type="date"
              label="Data de praça"
              name="data_praca"
              bgColor="gray.990"
              border="1px"
              borderColor="gray.700"
              _hover={{ bgColor: "gray.990" }}
              defaultValue={convertISODateToInputValue(mil.data_praca)}
              onBlur={(e) => handleSubmitForm({name: e.target.name,value: e.target.value}, mil.id, e)}
            />
            <FormHelperText>MM/DD/AAAA</FormHelperText>
          </FormControl>
          <FormControl>
            <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin/usuarios" ? false : true}
              as="select"
              label="Companhia"
              name="companhia"
              bgColor="gray.990"
              border="1px"
              borderColor="gray.700"
              _hover={{ bgColor: "gray.990" }}
              defaultValue={mil.companhia}
              onBlur={(e) => handleSubmitForm({name: e.target.name,value: e.target.value}, mil.id, e)}
            >
              <option value="1 CIA">1 CIA</option>
              <option value="2 CIA">2 CIA</option>
              <option value="3 CIA">3 CIA</option>
              <option value="CCAp">CCAp</option>
              <option value="EM">EM</option>
            </Input>
          </FormControl>
          <FormControl>
            <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin/usuarios" ? false : true}
              as="select"
              label="Pelotao"
              name="pelotao"
              bgColor="gray.990"
              border="1px"
              borderColor="gray.700"
              _hover={{ bgColor: "gray.990" }}
              defaultValue={mil.pelotao}
              onBlur={(e) => handleSubmitForm({name: e.target.name,value: e.target.value}, mil.id, e)}
            >
              <option value="Nenhum">Nenhum</option>
              <option value="1 PEL">1 PEL</option>
              <option value="2 PEL">2 PEL</option>
              <option value="3 PEL">3 PEL</option>
              <option value="PEL Ap">PEL Ap</option>
              <option value="SEC CMDO">SEC CMDO</option>
            </Input>
          </FormControl>
          <FormControl>
            <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin/usuarios" ? false : true}
              as="select"
              label="Status"
              name="status"
              bgColor="gray.990"
              border="1px"
              borderColor="gray.700"
              _hover={{ bgColor: "gray.990" }}
              defaultValue={mil.status}
              onBlur={(e) => handleSubmitForm({name: e.target.name,value: e.target.value}, mil.id, e)}
            >
              <option value="ativo">ativo</option>
              <option value="encostado">encostado</option>
              <option value="baixado">baixado</option>
              <option value="adido">adido</option>
              <option value="incapaz">inativo</option>
            </Input>
          </FormControl>
          <FormControl>
            <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin/usuarios" ? false : true}
              label="QMG/QMP"
              name="qmg_qmp"
              bgColor="gray.990"
              type="text"
              border="1px"
              borderColor="gray.700"
              _hover={{ bgColor: "gray.990" }}
              defaultValue={mil.qmg_qmp}
              onBlur={(e) => handleSubmitForm({name: e.target.name,value: e.target.value}, mil.id, e)}
            />
          </FormControl>
          <FormControl>
            <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin/usuarios" ? false : true}
              label="Cargo no QCP"
              name="cargo_qcp"
              defaultValue={mil.cargo_qcp}
              bgColor="gray.990"
              type="text"
              border="1px"
              borderColor="gray.700"
              _hover={{ bgColor: "gray.990" }}
              onBlur={(e) => handleSubmitForm({name: e.target.name,value: e.target.value}, mil.id, e)}
            />
          </FormControl>
          <FormControl>
            <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin/usuarios" ? false : true}
              label="Lugar que cumpre expediente"
              name="local_cumpre_expediente"
              defaultValue={mil.local_cumpre_expediente}
              bgColor="gray.990"
              type="text"
              border="1px"
              borderColor="gray.700"
              _hover={{ bgColor: "gray.990" }}
              onBlur={(e) => handleSubmitForm({name: e.target.name,value: e.target.value}, mil.id, e)}
            />
          </FormControl>
          <FormControl>
            <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin/usuarios" ? false : true}
              as="select"
              label="Motocarro"
              name="motocarro"
              bgColor="gray.990"
              border="1px"
              borderColor="gray.700"
              _hover={{ bgColor: "gray.990" }}
              defaultValue={mil.motocarro}
              onBlur={(e) => handleSubmitForm({name: e.target.name,value: e.target.value}, mil.id, e)}
            >
              <option value="SIM">SIM</option>
              <option value="NÃO">NÃO</option>
            </Input>
          </FormControl>
          <FormControl>
            <Input
            isDisabled={session?.militar.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin/usuarios" ? false : true}
              as="select"
              label="Habilitação Militar"
              name="hab_militar"
              bgColor="gray.990"
              border="1px"
              borderColor="gray.700"
              _hover={{ bgColor: "gray.990" }}
              defaultValue={mil.hab_militar}
              onBlur={(e) => handleSubmitForm({name: e.target.name,value: e.target.value}, mil.id, e)}
            >
              <option value="SIM">SIM</option>
              <option value="NÃO">NÃO</option>
            </Input>
          </FormControl>
          <ListarFuncao militar={mil} />
  
          {session?.militar.Funcao.find((func) => func.funcao == "super admin") && asPath == "/superAdmin/usuarios" ? (
            <>
              <AtribuirFuncao militar={mil} />
            </>
          ) : null}
        </Box>
      </Flex>
    );
  }
  