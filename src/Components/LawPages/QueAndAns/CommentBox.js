import { useState } from "react";
import { Box, Text, Textarea, Button, Flex } from "@chakra-ui/react";
import { MdInsertComment } from "react-icons/md";

export default function CommentBox() {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log("Comment Submitted:", comment);
    setComment("");
    setShowCommentBox(false);
  };

  return (
    <Box>
      <Text
        fontSize="sm"
        color="gray.500"
        display="flex"
        alignItems="center"
        gap={1}
        cursor="pointer"
        onClick={() => setShowCommentBox(!showCommentBox)}
      >
        comments <MdInsertComment />
      </Text>

      {showCommentBox && (
        <Flex mt={2} gap={2} flexDirection={{ base: "column", sm: "row" }}>
          <Textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            size="sm"
            resize="vertical"
            borderColor="gray.300"
            width="100%"
          />
          <Button
            colorScheme="blue"
            size="sm"
            onClick={handleSubmit}
            alignSelf={{ base: "stretch", sm: "flex-start" }}
          >
            Submit
          </Button>
        </Flex>
      )}
    </Box>
  );
}
