import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/react";
import NormalizedResource, {
  NORMALIZED_RESOURCE_FIELDS_FRAGMENT,
  normalizedResource
} from "../components/NormalizedResource";
import Link from "../components/Link";

const GET_RESOURCES_QUERY = gql`
  query GetResources {
    resources {
      id
      ...normalizedResourceFields
    }
  }
  ${NORMALIZED_RESOURCE_FIELDS_FRAGMENT}
`;

export default function ResourcesPage() {
  const { loading, error, data } = useQuery(GET_RESOURCES_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not load everything</p>;
  }

  const { resources } = data;

  const normalizedResources = resources.map(normalizedResource);

  return (
    <Box w="100%" bg="red.100" p={5}>
      <Heading textAlign="center" color="red.500">
        Warning! Admin area!
      </Heading>
      {normalizedResources.map((resource, index) => (
        <Link key={resource.id} to={`/admin/resource/${resource.id}`}>
          <NormalizedResource key={`${resource.__resource_type}-${index}`} normalizedResource={resource} />
        </Link>
      ))}
    </Box>
  );
}
