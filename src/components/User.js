import { Flex, Heading, Image, Avatar } from "@chakra-ui/react"

export default function User({ user }) {
    return (
        <Flex
            // bg="gray.50"
            direction="column"
            align="center"
            m="3"
            // border="1px"
            // borderColor="gray.200"
            // borderRadius="md"
            // overflow="hidden"
        >
            <Avatar
                size="xl"
                name={user.name} src={user.avatar.image.url} background={user.avatar.color} />
            <Heading>{ user.name }</Heading>
        </Flex>
    )
}