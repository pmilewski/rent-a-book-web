import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/react";
import NormalizedAnything, {
  NORMALIZED_ANYTHING_FIELDS_FRAGMENT,
  normalizedAnything
} from "../components/NormalizedAnything";

const GET_EVERYTHING_QUERY = gql`
  query GetEverything {
    everything {
      ...normalizedAnythingFields
    }
  }
  ${NORMALIZED_ANYTHING_FIELDS_FRAGMENT}
`;

export default function EverythingPage() {
  const { loading, error, data } = useQuery(GET_EVERYTHING_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load everything</p>;
  }

  const { everything } = data;

  const normalizedEverything = everything.map(normalizedAnything);

  return (
    <Box w="100%" bg="red.100" p={5}>
      <Heading textAlign="center" color="red.500">
        Warning! Admin area!
      </Heading>
      {normalizedEverything.map(anything => (
        <NormalizedAnything normalizedAnything={anything} />
      ))}
    </Box>
  );
}
