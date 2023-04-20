import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Image,
    ModalBody,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    VStack,
    useToast,
} from "@chakra-ui/react";
import logo from '../assets/modallogo.png'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { upload } from "./Helpers/VideoUpload";
import { usePrepareContractWrite, useBalance, useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { contract_address, abi } from "./Helpers/contract";


type FormData = {
    name: string;
    description: string
    video: FileList;
};

export default function ListTenderModal({ isOpen, onClose }) {
    const [loading, setloading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const [tenderData, setTenderData] = useState<{ name: string, vid_id: string, description: string } | null>(null)

    const onSubmit = async (data_: FormData) => {
        const { video, description, name } = data_
        const req = await upload(video)
        const { status, vid_id } = req
        setTenderData({ description, name, vid_id })
    };


    return (
        <Modal closeOnOverlayClick={false} size={'md'} isOpen={isOpen} onClose={() => { onClose() }} >
            <ModalOverlay bg='none'
                backdropFilter='auto'
                backdropInvert='80%'
                backdropBlur='2px' />
            <ModalContent border={'2px solid rgba( 255, 255, 255, 0.18 )'} backgroundColor={'white'} padding={2} >
                <ModalHeader>
                    <VStack spacing={5}>
                        <Flex borderRadius={50} position={'absolute'} top={-14} backgroundColor={'white'}>
                            <Image src={logo.src} alt="ThetaStream Supply logo" h={100} />
                        </Flex>
                        <Heading mt={20} color={'black'} as="h1" size="lg">
                            Create Tender Listing
                        </Heading>
                    </VStack>
                </ModalHeader>

                <ModalCloseButton />
                <ModalBody>
                    <Box bg={'white'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2}>
                                <FormControl id="name">
                                    <FormLabel>Tender Name</FormLabel>
                                    <Input type="text" {...register("name", { required: true })} />
                                    {errors.name && <Text color="red.500">This field is required</Text>}
                                </FormControl>
                                <FormControl id="description">
                                    <FormLabel>Short Description</FormLabel>
                                    <Input type="text" {...register("description", { required: true })} />
                                    {errors.description && <Text color="red.500">This field is required</Text>}
                                </FormControl>
                                <FormControl id="video">
                                    <FormLabel>Upload Video Advertisement</FormLabel>
                                    <Input paddingBottom={2} variant={'unstyled'} accept="video/*" type="file" {...register("video", { required: true })} />
                                    {errors.video && <Text color="red.500">This field is required</Text>}
                                </FormControl>
                                <Stack spacing={10}>
                                    <Button
                                        type="submit"
                                        bg={"blue.400"}
                                        color={"white"}
                                        _hover={{
                                            bg: "blue.500",
                                        }}
                                        isLoading={loading}
                                    >
                                        Submit Tender
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal >
    );
}
