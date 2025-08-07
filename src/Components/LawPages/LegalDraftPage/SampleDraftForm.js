import React, { useState } from "react";
import { Box, Input, Text, Button, Flex } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SampleDraftForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log("Title:", title);
    console.log("Content:", content); // content is HTML
  };

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];

  return (
    <Box bg="gray.100" p={8} minH="100vh">
      <Box
        maxW="1000px"
        mx="auto"
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontWeight="bold" mb={2}>
          Add Sample Drafts Title
        </Text>
        <Input
          placeholder="Enter Title"
          mb={6}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Text fontWeight="bold" mb={2}>
          Description
        </Text>
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          theme="snow"
          style={{ height: "300px", marginBottom: "20px" }}
        />

        <Flex justify="flex-end" mt={4} gap={4}>
          <Button variant="ghost">Cancel</Button>
          <Button colorScheme="green" onClick={handleSubmit}>
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default SampleDraftForm;
