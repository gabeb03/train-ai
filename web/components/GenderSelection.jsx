import {
  Box,
  Flex,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import FemaleOutline from "../assets/female-outline.png";
import MaleOutline from "../assets/male-outline.png";

export const GenderSelectionPage = ({ nextPageCallback }) => {
  const cardWidth = useBreakpointValue({ base: "200px", sm: "300px" });
  const cardHeight = useBreakpointValue({ base: "300px", sm: "400px" });

  const Card = ({ title, image, onClick }) => (
    <Box
      _hover={{ cursor: "pointer" }}
      borderWidth="1px"
      borderRadius="md"
      w={cardWidth}
      h={cardHeight}
      p="4"
      onClick={onClick}
      transition="all 0.3s ease"
    >
      <VStack h="100%" justify="center" p={2}>
        <Image src={image} alt={title} height="200px" mb="4" />
        <Text fontSize="2xl" color="gray.500">
          {title}
        </Text>
      </VStack>
    </Box>
  );

  const handleCardClick = () => {
    nextPageCallback();
  };

  return (
    <Box position="relative" minH="100vh">
      <Flex minH="100vh" align="center" justify="center" p="4">
        <Flex direction="column">
          <Flex gap="8" wrap="wrap" justify="center">
            <Card
              title="Male"
              image={MaleOutline}
              onClick={() => handleCardClick("Male")}
            />
            <Flex
              align="center"
              justify="center"
              w="100px"
              display={["none", "none", "none", "flex"]}
            >
              <Text fontSize="2xl" color="gray.500" textAlign="center">
                — OR —
              </Text>
            </Flex>
            <Card
              title="Female"
              image={FemaleOutline}
              onClick={() => handleCardClick("Female")}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
