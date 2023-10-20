import React from "react";
import { Heading, Flex, Link, Box, Divider } from '@chakra-ui/react'
import { Routes, Route, Link as RouterLink } from "react-router-dom"
import AuthorsPage from "./pages/AuthorsPage";
import BooksPage from "./pages/BooksPage";
import UsersPage from "./pages/UsersPage";

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
        justify="space-between"
        w="100%"
      >
        <Link to="/" as={RouterLink}>
          <Heading as="h1">Personal Library</Heading>
        </Link>
        <Flex>
          <Link to="/" as={RouterLink}>
            <Box as="span">Books</Box>
          </Link>
          <Divider orientation="vertical" mx="3" />
          <Link to="/authors" as={RouterLink}>
            <Box as="span">Authors</Box>
          </Link>
          <Divider orientation="vertical" mx="3" />
          <Link to="/users" as={RouterLink}>
            <Box as="span">Users</Box>
          </Link>
        </Flex>
      </Flex>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
      </Routes>
    </Flex>
  );
}
