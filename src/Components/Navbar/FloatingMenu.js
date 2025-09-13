import React, { useState, useRef } from "react";
import { Box, Circle, IconButton, useOutsideClick } from "@chakra-ui/react";
import { FaPlus, FaPen, FaCamera, FaUpload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TbArticle } from "react-icons/tb";
import { SiBloglovin } from "react-icons/si";
import { SiGooglenews } from "react-icons/si";
import { IoMdArrowRoundUp } from "react-icons/io";
const MotionBox = motion(Box);

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  // Close menu when clicking outside
  useOutsideClick({
    ref,
    handler: () => setIsOpen(false),
  });

  const actions = [
    {
      icon: TbArticle,
      color: "blue.400",
      label: "Article",
      onClick: () => navigate("/all-articles"), // example
    },
    {
      icon: SiBloglovin,
      color: "pink.400",
      label: "Blog",
      onClick: () => navigate("/all-blogs"), // example
    },
    {
      icon: SiGooglenews,
      color: "green.400",
      label: "News",
      onClick: () => navigate("/all-news"), // example
    },
  ];

  return (
    <Box position="absolute" top="-25px" ref={ref}>
      {/* Plus button */}
      <Circle
        size="55px"
        bg="teal.500"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 0 0 10px white, 0 4px 12px rgba(0,0,0,0.2)"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        zIndex={2}
      >
        <IoMdArrowRoundUp size={22} />
      </Circle>

      {/* Floating buttons */}
      <AnimatePresence>
        {isOpen &&
          actions.map((action, index) => {
            // Arc range = 120° (from -150° to -30°)
            const startAngle = -150;
            const endAngle = -30;
            const angle =
              (startAngle +
                (index * (endAngle - startAngle)) / (actions.length - 1)) *
              (Math.PI / 180);

            const radius = 80; // distance from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <MotionBox
                key={action.label}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                animate={{ scale: 1, x, y, opacity: 1 }}
                exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                position="absolute"
                top="0"
                left="0"
                zIndex={1}
              >
                <Box textAlign="center">
                  <IconButton
                    icon={<action.icon />}
                    aria-label={action.label}
                    isRound
                    bg={action.color}
                    color="white"
                    boxShadow="md"
                    _hover={{ bg: action.color }}
                    onClick={action.onClick}
                    size="lg"
                  />
                  {/* Label under icon */}
                  <Box fontSize="xs" mt={1} color="gray.700">
                    {action.label}
                  </Box>
                </Box>
              </MotionBox>
            );
          })}
      </AnimatePresence>
    </Box>
  );
};

export default FloatingMenu;
