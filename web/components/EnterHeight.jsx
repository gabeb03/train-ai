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

export const EnterHeight = ({ nextPageCallback, setUserMetadata }) => {
  const Units = {
    FeetInches: "Feet/Inches",
    Centimeters: "Centimeters",
  };

  const [selectedUnit, setSelectedUnit] = useState(Object.keys(Units)[0]);
  const [heightCm, setHeightCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  const handleMenuClick = (unit) => {
    setSelectedUnit(unit);
  };

  const convertToCm = (feet, inches) => {
    return parseFloat(feet) * 30.48 + parseFloat(inches) * 2.54;
  };

  const handleButtonClick = () => {
    const convertedHeight = convertToCm(feet, inches);
    setUserMetadata((prev) => ({
      ...prev,
      height:
        selectedUnit === "FeetInches" // The value of the Units "enum" is different from the key
          ? convertedHeight
          : parseFloat(heightCm),
    }));
    nextPageCallback();
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
                onClick={handleButtonClick}
                display={["none", "block"]}
              >
                Next
              </Button>
            </Flex>
            <Button
              variant="solid"
              onClick={handleButtonClick}
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
