import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";
import UserDetails, {USER_DETAILS_FIELDS_FRAGMENT} from "../components/UserDetails";
import BookCopy from "../components/BookCopy";
import {BOOK_COPY_FIELDS_FRAGMENT} from "../components/BookCopy/fragments";

export const GET_USER_QUERY = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      ...userDetailsFields
      ownedBookCopies {
        ...bookCopyFields
      }
      borrowedBookCopies {
        ...bookCopyFields
      }
    }
  }
  ${USER_DETAILS_FIELDS_FRAGMENT}
  ${BOOK_COPY_FIELDS_FRAGMENT}
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

      <Heading as="h3" size="lg" textAlign="center">
        Owned Book Copies
      </Heading>
      <Flex wrap="wrap">
        { user.ownedBookCopies.map(bookCopy => (
          <BookCopy
            key={bookCopy.id}
            bookCopy={bookCopy}
            // showOwner
            showBorrower
            showActions
          />
        ))}
      </Flex>

      <Heading as="h3" size="lg" textAlign="center">
        Borrowed Book Copies
      </Heading>
      <Flex wrap="wrap">
        { user.borrowedBookCopies.map(bookCopy => (
          <BookCopy
            key={bookCopy.id}
            bookCopy={bookCopy}
            showOwner
            // showBorrower
            showActions
          />
        ))}
      </Flex>

    </Flex>
  );
}
