import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, Text, useColorModeValue
} from "@chakra-ui/react";
import { contract_address, abi } from '../components/Helpers/contract'

type FormValues = {
    name: string;
    email: string;
};

type Props = {
    children?: React.ReactNode;
};

export default function Registration({ children }: Props) {
    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();

    // Submit Handler
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    };


    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Register your account</Heading>
                    <Text fontSize={"lg"} color={"whiteAlpha.600"}>
                        Register first to interact in website
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack
                        spacing={4}
                        as="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormControl id="text" isRequired>
                            <FormLabel>Name / Company Name</FormLabel>
                            <Input type="text" {...register("name", { required: true })} />
                            {errors.name && <span>This field is required</span>}
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span>This field is required</span>}
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                type="submit"
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                Register
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
