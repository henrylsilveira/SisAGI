import { Center } from "@chakra-ui/react";
import DotLoader from "react-spinners/DotLoader";

export function NotLoaded(){
    return (
        <Center p={6} m={2} h="auto">
          <DotLoader size={64} color="#55DD55" />
        </Center>
    )
}