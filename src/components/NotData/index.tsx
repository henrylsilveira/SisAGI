import { Center, Flex, Icon } from "@chakra-ui/react";
import { BsClipboardData } from "react-icons/bs";

export function NotData({textoComponent}){
    return (
        <Flex textAlign="center" justifyContent="center" bgColor="#55000033" mx={4} my={4} p={4} rounded="base" border="1px" borderColor="red.900">
            <Icon as={BsClipboardData} color="red.800" mx={4}/>{textoComponent}
        </Flex>
    )
    
}