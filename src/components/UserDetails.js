import { Flex, Heading, Avatar, Box } from "@chakra-ui/react";
import { gql } from "@apollo/client";

export const USER_DETAILS_FIELDS_FRAGMENT = gql`
  fragment userDetailsFields on User {
    id
    name
    info
    avatar {
      color
      image {
        url
      }
    }
  }
`;

export default function User({ user }) {
  return (
    <Flex alignItems="center">
      <Flex alignItems="center" direction="column" w="100%" mt="5">
        <Avatar
          size="xl"
          src={user.avatar.image.url}
          background={user.avatar.color}
        />
        <Heading mx="4" color="gray.700">
          {user.name}
        </Heading>
      </Flex>
      <Box as="article">{user.info}</Box>
    </Flex>
  );
}
