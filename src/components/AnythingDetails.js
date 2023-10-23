import AuthorDetails from "./AuthorDetails";
import BookDetails from "./BookDetails";
import UserDetails from "./UserDetails";

import { BOOK_DETAILS_FIELDS_FRAGMENT } from "../components/BookDetails"; 
import { AUTHOR_DETAILS_FIELDS_FRAGMENT } from "../components/AuthorDetails";
import { USER_DETAILS_FIELDS_FRAGMENT } from "../components/UserDetails";
import { gql } from "@apollo/client";

export const ANYTHING_DETAILS_FIELDS_FRAGMENT = gql`
  fragment anythingDetailsFields on Anything {
      ...bookDetailsFields
      ...authorDetailsFields
      ...userDetailsFields
  }
  ${BOOK_DETAILS_FIELDS_FRAGMENT}
  ${AUTHOR_DETAILS_FIELDS_FRAGMENT}
  ${USER_DETAILS_FIELDS_FRAGMENT}
`;

export default function AnythingDetails({ anything }) {
  switch (anything.__typename) {
    case "Book": {
      return <BookDetails book={anything} />;
    }
    case "Author": {
      return <AuthorDetails author={anything} />;
    }
    case "User": {
      return <UserDetails user={anything} />;
    } 
    default: {
      return <p>Unsupported __typename - [{anything.__typename}]</p>;
    }
  }
}