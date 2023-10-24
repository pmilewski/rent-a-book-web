import { Button } from "@chakra-ui/react";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { BOOK_COPY_FIELDS_FRAGMENT } from "../BookCopy/fragments";
import { GET_USER_QUERY } from "../../pages/UserDetailsPage";
import { useToast } from "@chakra-ui/react";

const BORROW_BOOK_COPY_MUTATION = gql`
  mutation BorrowBookCopy($bookCopyId: ID!) {
    borrowBookCopy(id: $bookCopyId) {
      ...bookCopyFields
    }
  }
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function BorrowButton({ availableBookCopy }) {
  const toast = useToast();
  const [borrowBookCopy, { loading }] = useMutation(
    BORROW_BOOK_COPY_MUTATION, {
      variables: { bookCopyId: availableBookCopy.id },
      onError: (error) => {
        toast({
          title: "Could not borrow the book.",
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
          description: "You have successfully borrowed the book.",
          status: "success",
          duration: 1000,
          position: "top",
          isClosable: true,
        });
      },
      update: (cache, { data: { borrowBookCopy } }) => {
        const cachedData = cache.readQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowBookCopy.borrower.id },
        })
        const data = JSON.parse(JSON.stringify(cachedData));
        data.user.borrowedBookCopies.push(borrowBookCopy);
        cache.writeQuery({
          query: GET_USER_QUERY,
          variables: { userId: borrowBookCopy.borrower.id },
          data
        })
      }
  }
  );
  return (
    <Button disabled={loading} onClick={borrowBookCopy}>
      Borrow
    </Button>
  );
}
