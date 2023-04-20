import { useForm } from "react-hook-form";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    useToast,
} from "@chakra-ui/react";

interface Signer {
    "status": string,
    "body": {
        "uploads": [
            {
                "id": string
                "service_account_id": string
                "presigned_url": string
                "presigned_url_expiration": string
                "presigned_url_expired": boolean,
                "create_time": boolean,
                "update_time": boolean
            }
        ]
    }
}

type FormData = {
    name: string;
    description: string;
    video: FileList;
};

function VideoForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();
    const toast = useToast();

    const progressCheck = async () => {
        fetch("/api/checkprogress", {
            method: "POST",
            body: JSON.stringify({ 'upload_id': 'video_90qbix5xbg8vf2amghmq8s2761' })
        }).then(res => res.json().then(res => console.log(res)))
    }
    const onSubmit = async (data: FormData) => {
        // Send form data to server here
        const req = await fetch('/api/createsigner')
        const result: Signer = await req.json()

        const { id, presigned_url } = result.body.uploads[0]

        const formData = {
            name: data.name,
            descriptionn: data.description,
            id: id,
            presigned_url: presigned_url,
            file_name: data.video[0].name
        }

        // Upload Video
        const upload = await fetch(presigned_url, {
            'method': 'PUT',
            'headers': {
                'Content-Type': 'application/octet-stream'
            },
            body: JSON.stringify(data.video[0])
        })

        fetch("/api/uploadvideo", {
            method: "POST",
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to upload video");
                }
                return response.json();
            })
            .then((data) => {
                toast({
                    title: "Video uploaded",
                    description: "Your video has been uploaded successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                toast({
                    title: "Failed to upload video",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
        // Use the `toast` function to display a success message
    };

    const videoFile = watch("video");

    return (
        <Box w={'70%'} m={'auto'} h={'100vh'} p={4}>
            <iframe src="https://player.thetavideoapi.com/video/video_kdt4n8mtsxr515tdx0p5pjd2h9"
                width="40%"
                height="150" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="name" isRequired mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" {...register("name", { required: true })} />
                    {errors.name && <span>This field is required</span>}
                </FormControl>
                <FormControl id="description" isRequired mb={4}>
                    <FormLabel>Short Description</FormLabel>
                    <Textarea {...register("description", { required: true })} />
                    {errors.description && <span>This field is required</span>}
                </FormControl>
                <FormControl id="video" isRequired mb={4}>
                    <FormLabel>Upload Video</FormLabel>
                    <Box
                        borderWidth="2px"
                        borderColor="gray.400"
                        borderStyle="dashed"
                        borderRadius="md"
                        p={4}
                        cursor="pointer"
                        _hover={{ borderColor: "gray.500" }}
                    >
                        <input
                            type="file"
                            {...register("video", { required: true })}
                            accept="*"
                        />
                        {errors.video && <span>This field is required</span>}
                        <p>
                            {videoFile ? videoFile[0].name : "Drag and drop video file here or click to browse"}
                        </p>
                    </Box>
                </FormControl>
                <Button type="submit" colorScheme="blue">
                    Submit
                </Button>
                <Button onClick={progressCheck} colorScheme="blue">
                    Check Progress
                </Button>
            </form>
        </Box>
    );
}

export default VideoForm;
