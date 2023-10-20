import { gql, useQuery } from '@apollo/client';
import { Flex, SimpleGrid } from "@chakra-ui/react"

import User from '../components/User';

const ALL_USERS_QUERY = gql`
  query GetAllUsers {
    users {
      name
      avatar {
        image { 
            url
        }
        color
      }
    }
  }
`;
export default function UsersPage() {
    const { loading, error, data } = useQuery(ALL_USERS_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
     
    const { users } = data;
    return (
        <SimpleGrid columns={["1", "2", "4"]}>
            {users.map(user => (
                <User key={user.name} user={user} />
            ))}
        </SimpleGrid>
        
    )
}  
