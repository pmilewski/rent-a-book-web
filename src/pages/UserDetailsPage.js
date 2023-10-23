import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import UserDetails, {USER_DETAILS_FIELDS_FRAGMENT} from "../components/UserDetails";

const GET_USER_QUERY = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      ...userDetailsFields
    }
  }
  ${USER_DETAILS_FIELDS_FRAGMENT}
`;


export default function UserDetailsPage() {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load user</p>;
  }
  const { user } = data;

  return (
    <Flex wrap="wrap" justify="space-around">
      <UserDetails user={user} />
    </Flex>
  );
}
