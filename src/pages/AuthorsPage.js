import { gql, useQuery } from '@apollo/client';
import { Flex } from "@chakra-ui/react"

import Author from '../components/Author';

const ALL_AUTHORS_QUERY = gql`
  query GetAllAuthors {
    authors {
      name
      photo {
        url
      }
    }
  }
`;
export default function AuthorsPage() {
    const { loading, error, data } = useQuery(ALL_AUTHORS_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
     
    const { authors } = data;
    return (
        <Flex wrap="wrap" justify="space-around">
            {authors.map(author => (
                <Author key={author.name} author={author} />
            ))}
        </Flex>
        
    )
}  
