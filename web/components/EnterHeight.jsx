import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export const EnterHeight = ({ nextPageCallback }) => {
  const Units = {
    Centimeters: "Centimeters",
    FeetInches: "Feet/Inches",
  };

  const [selectedUnit, setSelectedUnit] = useState(Object.keys(Units)[0]);
  const [heightCm, setHeightCm] = useState(""); // Default empty
  const [feet, setFeet] = useState(""); // Default empty
  const [inches, setInches] = useState(""); // Default empty

  const handleMenuClick = (unit) => {
    setSelectedUnit(unit);
  };

  const convertToCm = (feet, inches) => {
    return feet * 30.48 + inches * 2.54;
  };

  const convertToFeetInches = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  return (
    <Container>
      <Flex justify="center" align="center" minH="100%">
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={6}>
            Enter Height 📏
          </Text>
          <VStack
            spacing={6}
            p={6}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
          >
            <Flex
              spacing={4}
              justify="center"
              direction={["column", "row"]}
              alignItems={["center", "flex-start"]}
              w="100%"
            >
              {selectedUnit === "Centimeters" ? (
                <NumberInput
                  value={heightCm}
                  onChange={(value) => setHeightCm(value)}
                  min={50}
                  max={250}
                  width={["100%", "15vw"]}
                  minWidth="100px"
                  mb={[4, 0]}
                  mr={[0, 5]}
                >
                  <NumberInputField borderRadius="md" />
                </NumberInput>
              ) : (
                <>
                  <NumberInput
                    value={feet}
                    onChange={(value) => setFeet(value)}
                    min={3}
                    max={8}
                    width={["100%", "6vw"]}
                    minWidth="50px"
                    mb={[4, 0]}
                    mr={[0, 5]}
                  >
                    <NumberInputField borderRadius="md" placeholder="ft" />
                  </NumberInput>
                  <NumberInput
                    value={inches}
                    onChange={(value) => setInches(value)}
                    min={0}
                    max={11}
                    width={["100%", "6vw"]}
                    minWidth="50px"
                    mb={[4, 0]}
                    mr={[0, 5]}
                  >
                    <NumberInputField borderRadius="md" placeholder="in" />
                  </NumberInput>
                </>
              )}
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="outline"
                  w={["100%", "auto"]}
                  mb={[4, 0]}
                  mr={[0, 5]}
                >
                  {Units[selectedUnit]}
                </MenuButton>
                <MenuList>
                  {Object.keys(Units).map((key) => (
                    <MenuItem key={key} onClick={() => handleMenuClick(key)}>
                      {Units[key]}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Button
                variant="solid"
                onClick={nextPageCallback}
                display={["none", "block"]}
              >
                Get Started
              </Button>
            </Flex>
            <Button
              variant="solid"
              onClick={nextPageCallback}
              width="100%"
              display={["block", "none"]}
            >
              Next
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};
