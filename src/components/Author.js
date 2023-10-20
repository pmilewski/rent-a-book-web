import { Flex, Heading, Image } from "@chakra-ui/react"

export default function Author({ author: { name, photo: { url } } }) {
    return (
        <Flex
            bg="gray.50"
            direction="column"
            align="center"
            m="3"
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            overflow="hidden"
        >
            <Image
                boxSize="200px"
                objectFit="cover"
                src={url}
                alt={name}
            />
            <Heading size="md" color="gray.700" my="3">
                {name}
            </Heading>
        </Flex>
    )
}