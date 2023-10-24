import { Button } from "@chakra-ui/react";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { BOOK_COPY_FIELDS_FRAGMENT } from "../BookCopy/fragments";
import { GET_USER_QUERY } from "../../pages/UserDetailsPage";
import { useToast } from "@chakra-ui/react";

const RETURN_BOOK_COPY_MUTATION = gql`
  mutation ReturnBookCopy($bookCopyId: ID!) {
    returnBookCopy(id: $bookCopyId) {
      ...bookCopyFields
    }
  }
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function ReturnButton({ borrowedBookCopy }) {
  const toast = useToast();
  const [returnBookCopy, { loading }] = useMutation(
    RETURN_BOOK_COPY_MUTATION, {
      variables: { bookCopyId: borrowedBookCopy.id },
      onError: (error) => {
        toast({
          title: "Could not return the book.",
          description: error.message,
          status: "error",
          duration: 1000,
          position: "top",
          isClosable: true,
        });
      },
      onCompleted: () => {
        toast({
          title: "Success",
          description: "You have successfully returned the book.",
          status: "success",
          duration: 1000,
          position: "top",
          isClosable: true,
        });
      },
      update: (cache, { data: { returnBookCopy } }) => {
        const cachedData = cache.readQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowedBookCopy.borrower.id },
        })
        const data = JSON.parse(JSON.stringify(cachedData));
        data.user.borrowedBookCopies = data.user.borrowedBookCopies.filter((bc) => {
          return bc.id !== returnBookCopy.id
        });
        cache.writeQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowedBookCopy.borrower.id },
          data
        })
      }
    }
  );
  return (
    <Button disabled={loading} onClick={returnBookCopy}>
      Return
    </Button>
  );
}
