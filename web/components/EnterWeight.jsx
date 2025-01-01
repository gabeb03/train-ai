import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
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

export const EnterWeight = ({ nextPageCallback }) => {
  const Units = {
    Pounds: "Pounds",
    Kilograms: "Kilograms",
  };
  const [selectedUnit, setSelectedUnit] = useState(Object.keys(Units)[0]);
  const [weight, setWeight] = useState(15);

  const handleMenuClick = (unit) => {
    setSelectedUnit(unit);
  };

  return (
    <Container>
      <Flex justify="center" align="center" minH="100%">
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={6}>
            Enter Weight ⚖️
          </Text>
          <VStack
            spacing={6}
            p={6}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
          >
            <HStack spacing={4} justify="center">
              <NumberInput
                value={weight}
                onChange={(value) => setWeight(value)}
                min={10}
                max={200}
                width="15vw"
                minWidth="100px"
              >
                <NumberInputField borderRadius="md" />
              </NumberInput>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="outline"
                >
                  {selectedUnit}
                </MenuButton>
                <MenuList>
                  {Object.keys(Units).map((key) => (
                    <MenuItem key={key} onClick={() => handleMenuClick(key)}>
                      {key}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Button
                variant="solid"
                onClick={nextPageCallback}
                display={["none", "block"]}
              >
                Next
              </Button>
            </HStack>
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

export default EnterWeight;
