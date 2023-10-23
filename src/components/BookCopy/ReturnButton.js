import { Button } from "@chakra-ui/react";
import React from "react";

export default function ReturnButton({ borrowedBookCopy }) {
  return (
    <Button onClick={() => console.log("User wants to return the book copy")}>
      Return
    </Button>
  );
}
