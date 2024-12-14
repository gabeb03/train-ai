import React, { useEffect, useState } from "react";
import {
  VStack,
  Checkbox,
  CheckboxGroup,
  Heading,
  Box,
  Container,
  useColorModeValue,
  Flex,
  Text,
} from "@chakra-ui/react";
import { api } from "../api";

export const Program = () => {
  const [activities, setActivities] = useState([]);
  const [checkedSets, setCheckedSets] = useState({});

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const currentDate = new Date();
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const currentDay = daysOfWeek[currentDate.getDay()];
        const fetchedResults = await api.activity.findMany({
          filter: {
            day: { contains: currentDay },
          },
        });

        // Initialize checkedSets with all sets unchecked
        const initialCheckedSets = fetchedResults.reduce((acc, activity) => {
          acc[activity.id] = new Array(activity.sets || 0).fill(false);
          return acc;
        }, {});

        setActivities(fetchedResults);
        setCheckedSets(initialCheckedSets);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const handleActivitySetsCheck = (activityId, setIndex) => {
    setCheckedSets((prev) => {
      const activitySets = [...prev[activityId]];
      activitySets[setIndex] = !activitySets[setIndex];
      return {
        ...prev,
        [activityId]: activitySets,
      };
    });
  };

  const isAllSetsChecked = (activityId) => {
    return checkedSets[activityId]?.every(Boolean);
  };

  const isSomeSetChecked = (activityId) => {
    const sets = checkedSets[activityId] || [];
    return sets.some(Boolean) && !isAllSetsChecked(activityId);
  };

  const toggleAllSets = (activityId) => {
    setCheckedSets((prev) => {
      const currentSets = prev[activityId] || [];
      const allChecked = isAllSetsChecked(activityId);
      return {
        ...prev,
        [activityId]: currentSets.map(() => !allChecked),
      };
    });
  };

  return (
    <>
      <Box paddingTop={10}></Box>
      <Container maxW="2xl" py={8} borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          {new Date().toLocaleDateString("en-US", { weekday: "long" })}
        </Heading>

        <VStack spacing={4} align="stretch">
          {activities.map((activity) => (
            <Box key={activity.id} borderWidth="1px" borderRadius="md" p={4}>
              <Checkbox
                isChecked={isAllSetsChecked(activity.id)}
                isIndeterminate={isSomeSetChecked(activity.id)}
                onChange={() => toggleAllSets(activity.id)}
                colorScheme="teal"
                fontWeight="semibold"
                mb={2}
              >
                {activity.activityName}
              </Checkbox>

              <VStack align="stretch" pl={6}>
                {checkedSets[activity.id]?.map((isChecked, setIndex) => (
                  <Checkbox
                    key={`${activity.id}-set-${setIndex}`}
                    isChecked={isChecked}
                    onChange={() =>
                      handleActivitySetsCheck(activity.id, setIndex)
                    }
                    colorScheme="teal"
                  >
                    <Flex alignItems="center">
                      <Text mr={2}>Set {setIndex + 1}</Text>
                      <Text fontSize="sm" color="gray.500">
                        ({activity.reps} reps)
                      </Text>
                    </Flex>
                  </Checkbox>
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>
      </Container>
    </>
  );
};

export default Program;
