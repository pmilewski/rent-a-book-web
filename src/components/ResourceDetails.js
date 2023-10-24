import AuthorDetails from "./AuthorDetails";
import BookDetails from "./BookDetails";
import UserDetails from "./UserDetails";

import { BOOK_DETAILS_FIELDS_FRAGMENT } from "./BookDetails"; 
import { AUTHOR_DETAILS_FIELDS_FRAGMENT } from "./AuthorDetails";
import { USER_DETAILS_FIELDS_FRAGMENT } from "./UserDetails";
import BookCopy from "./BookCopy";
import { BOOK_COPY_FIELDS_FRAGMENT } from "./BookCopy/fragments";
import { gql } from "@apollo/client";

export const RESOURCE_DETAILS_FIELDS_FRAGMENT = gql`
  fragment resourceDetailsFields on Resource {
      ...bookDetailsFields
      ...authorDetailsFields
      ...userDetailsFields
      ...bookCopyFields
  }
  ${BOOK_DETAILS_FIELDS_FRAGMENT}
  ${AUTHOR_DETAILS_FIELDS_FRAGMENT}
  ${USER_DETAILS_FIELDS_FRAGMENT}
  ${BOOK_COPY_FIELDS_FRAGMENT}
`;

export default function ResourceDetails({ resource }) {
  switch (resource.__typename) {
    case "Book": {
      return <BookDetails book={resource} />;
    }
    case "Author": {
      return <AuthorDetails author={resource} />;
    }
    case "User": {
      return <UserDetails user={resource} />;
    } 
    case "BookCopy": {
      return <BookCopy bookCopy={resource} showBorrower showOwner />;
    }
    default: {
      return <p>Unsupported __typename - [{resource.__typename}]</p>;
    }
  }
}
