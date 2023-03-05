import { Center } from "@chakra-ui/react";
import DotLoader from "react-spinners/DotLoader";

export function NotLoaded(){
    return (
        <Center h="100vh">
        <DotLoader size={64} color="#55DD55" />
      </Center>
    )
}