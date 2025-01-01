import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  useEditable,
} from "@chakra-ui/react";
import CyclistOutline from "../assets/cyclist-outline.png";
import RunnerOutline from "../assets/runner-outline.png";
import WeightTrainingOutline from "../assets/weight-training-outline.png";
import { useEffect, useState } from "react";

export const SportSelection = () => {
  const sports = {
    "Weight Training": WeightTrainingOutline,
    Cycling: CyclistOutline,
    Running: RunnerOutline,
  };

  const experienceLevels = [
    "No Interest",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const defaultExperienceLevel = {};
  Object.keys(sports).forEach((sport) => {
    defaultExperienceLevel[sport] = 0;
  });

  const [experienceLevelMap, setExperienceLevelMap] = useState(
    defaultExperienceLevel
  );

  const SportSelection = ({ sportName, image, onClick }) => {
    const [sliderValue, setSliderValue] = useState(
      experienceLevelMap[sportName]
    );

    return (
      <Box
        borderWidth="1px"
        borderRadius="md"
        onClick={onClick}
        minWidth="900px"
      >
        <HStack p={2} justify="space-between" width="100%" pr="65px">
          <Flex align="center">
            <Image
              src={image}
              alt={sportName}
              height="70px"
              width="70px"
              objectFit="contain"
              mb="4"
            />
            <Text fontSize="2xl" color="gray.500" ml="35px">
              {sportName}
            </Text>
          </Flex>
          <Slider
            value={sliderValue}
            min={0}
            max={experienceLevels.length - 1}
            step={1}
            maxWidth="400px"
            onChange={(val) => setSliderValue(val)}
            onChangeEnd={(val) =>
              setExperienceLevelMap((prevState) => ({
                ...prevState,
                [sportName]: val,
              }))
            }
          >
            <SliderMark value={0} mt="2.5" ml="-2.5" fontSize="sm">
              {experienceLevels[0]}
            </SliderMark>
            <SliderMark
              value={experienceLevels.length - 1}
              mt="2"
              ml="-2.5"
              fontSize="sm"
            >
              {experienceLevels.at(-1)}
            </SliderMark>
            <SliderTrack bg="gray.100">
              <SliderFilledTrack bg="gray.500" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </HStack>
      </Box>
    );
  };

  useEffect(() => {
    console.log(experienceLevelMap);
  }, [experienceLevelMap]);

  return (
    <Box position="relative" minH="100vh">
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        direction="column"
        gap={4}
        p="4"
      >
        {Object.keys(sports).map((sport, i) => {
          return (
            <SportSelection key={i} sportName={sport} image={sports[sport]} />
          );
        })}
        <Box minWidth="900px" textAlign="right">
          <Button>Done</Button>
        </Box>
      </Flex>
    </Box>
  );
};
