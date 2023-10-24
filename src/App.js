import { Routes, Route } from "react-router-dom";

import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";
import UsersPage from "./pages/UsersPage";
import { Flex, Divider, Heading } from "@chakra-ui/react";
import Link from "./components/Link";
import BookDetailsPage from "./pages/BookDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import AnythingDetailsPage from "./pages/AnythingDetailsPage";
import EverythingPage from "./pages/EverythingPage";

export default function App() {
  return (
    <Flex
      direction="column"
      align="center"
      width={["100%", "75%", "60%"]}
      mx="auto"
    >
      <Flex
        direction={["column", null, "row"]}
        align="center"
        justifyContent="space-between"
        w="100%"
        mx="5"
      >
        <Link to="/">
          <Heading as="h1">Personal Library</Heading>
        </Link>
        <Flex>
          <Link to="/">
            <h1>Books</h1>
          </Link>
          <Divider orientation="vertical" />
          <Link to="/authors">
            <h1>Authors</h1>
          </Link>
          <Divider orientation="vertical" />
          <Link to="/users">
            <h1>Users</h1>
          </Link>
        </Flex>
      </Flex>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="books/:bookId" element={<BookDetailsPage />} />
        <Route path="/books/search/:searchQuery" element={<BooksPage />} />
        <Route path="/books/search/" element={<BooksPage />} />

        <Route path="authors/" element={<AuthorsPage />} />
        <Route path="authors/:authorId" element={<AuthorDetailsPage />} />
        <Route path="/authors/search/:searchQuery" element={<AuthorsPage />} />
        <Route path="/authors/search/" element={<AuthorsPage />} />
        
        <Route path="users/" element={<UsersPage />} />
        <Route path="users/:userId" element={<UserDetailsPage />} />
        <Route path="/users/search/:searchQuery" element={<UsersPage />} />
        <Route path="/users/search/" element={<UsersPage />} />

        <Route path="admin/anything/:anyId" element={<AnythingDetailsPage />} />
        <Route path="admin/everything" element={<EverythingPage />} />
      </Routes>
    </Flex>
  );
}
