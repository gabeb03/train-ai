import React from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Image,
  VStack,
  CircularProgress,
  useBreakpointValue,
} from "@chakra-ui/react";
import MaleOutline from "../assets/male-outline.png";
import FemaleOutline from "../assets/female-outline.png";

export const GenderSelectionPage = () => {
  const cardWidth = useBreakpointValue({ base: "200px", sm: "300px" });
  const cardHeight = useBreakpointValue({ base: "300px", sm: "400px" });

  const Card = ({ title, image, onClick }) => (
    <Box
      _hover={{ cursor: "pointer" }}
      borderWidth="2px"
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

  const handleCardClick = (gender) => {
    alert(`You selected: ${gender}`);
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
              display={["none", "none", "flex"]}
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

      <Flex
        position="absolute"
        bottom="4"
        right="4"
        direction="column"
        align="center"
      >
        <CircularProgress value={30} size="40px" color="gray.500" />
        <Text mb="2" mt="1" fontWeight="semibold">
          Step 1/3
        </Text>
      </Flex>
    </Box>
  );
};
