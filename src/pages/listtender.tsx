import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import LisTenderModal from "../components/ListTenderModal";

export default function SimpleCard() {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
            <LisTenderModal isOpen={isOpen} onClose={onClose} />
            <Button onClick={onOpen}>Open Modal</Button>
        </Flex>
    );
}
