import { gql, useQuery } from "@apollo/client";
import { SimpleGrid, Box } from "@chakra-ui/react";
import User, { USER_FIELDS_FRAGMENT } from "../components/User";
import SearchBox, { useSearchQuery } from "../components/SearchBox";
import Link from "../components/Link";

const ALL_USERS_QUERY = gql`
  query AllUsers($searchQuery: String!) {
    users(searchQuery: $searchQuery) {
      ...userFields
    }
  }
  ${USER_FIELDS_FRAGMENT}
`;

export default function UsersPage() {
  const baseSearchPath = "/users/search/";
  const [searchQuery, handleSearchQueryChange] = useSearchQuery(baseSearchPath);
  const { loading, error, data } = useQuery(ALL_USERS_QUERY, {
    variables: { searchQuery }
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load users...</p>;
  }
  const { users } = data;
  const hasUsers = users.length > 0;
  return (
    <Box w="100%">
      <SearchBox
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <SimpleGrid columns={[1, 2, 4]}>
        { hasUsers ? users.map(user => (
          <Link key={user.id} to={`/users/${user.id}`}>
            <User user={user} />
          </Link>
        )) : <p>No users found</p>}
      </SimpleGrid>
    </Box>
  );
}
