import React, { useState, useRef } from "react";
import { Flex, Input } from "@chakra-ui/react";

export const SearchBox = ({ questions = [], setFilteredQuestions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceRef = useRef(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Clear old debounce timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (!Array.isArray(questions)) return; // safety check

      if (term.trim() === "") {
        setFilteredQuestions(questions);
      } else {
        setFilteredQuestions(
          questions.filter((q) =>
            q.question.toLowerCase().includes(term.toLowerCase())
          )
        );
      }
    }, 500); // debounce delay
  };

  return (
    <Flex mb={6}>
      <Input
        placeholder="Search questions..."
        value={searchTerm}
        onChange={handleSearchChange}
        mr={2}
      />
    </Flex>
  );
};
