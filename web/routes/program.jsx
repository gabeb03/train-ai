import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Tag,
  TagLabel,
  Text,
  VStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { api } from "../api";
import { ProgressGraph } from "../components/ProgressGraph";
import AverageCompletion from "../components/AverageCompletion";

export const Program = () => {
  const [activities, setActivities] = useState([]);
  const [checkedSets, setCheckedSets] = useState({});
  const [todayScore, setTodayScore] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const fetchActivitiesAndScore = async () => {
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
          filter: { day: { contains: currentDay } },
        });

        const initialCheckedSets = fetchedResults.reduce((acc, activity) => {
          const activityDate = new Date(activity.updatedAt);
          const initialCheckedSetsArr = [];
          for (let i = 1; i <= activity.sets; i++) {
            initialCheckedSetsArr.push(
              i / activity.sets <= activity.percentComplete &&
                activityDate.getDate() === currentDate.getDate() &&
                activityDate.getMonth() === currentDate.getMonth() &&
                activityDate.getFullYear() === currentDate.getFullYear()
            );
          }
          acc[activity.id] = initialCheckedSetsArr;
          return acc;
        }, {});

        setActivities(fetchedResults);
        setCheckedSets(initialCheckedSets);

        currentDate.setHours(0, 0, 0, 0);
        const todayScoreResults = await api.score.findMany({
          filter: { updatedAt: { after: currentDate } },
        });

        if (todayScoreResults.length > 0) {
          setTodayScore(todayScoreResults[0].score);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchActivitiesAndScore();
  }, []);

  const trueRatio = (array) => {
    if (array.length === 0) return 0;
    const trueCount = array.filter((value) => value === true).length;
    return trueCount / array.length;
  };

  const handleActivitySetsCheck = async (activityId, setIndex) => {
    let updatedActivitySets = null;
    setCheckedSets((prev) => {
      const activitySets = [...prev[activityId]];
      activitySets[setIndex] = !activitySets[setIndex];
      updatedActivitySets = { ...prev, [activityId]: activitySets };
      return updatedActivitySets;
    });
    await api.activity.update(activityId, {
      percentComplete:
        Math.ceil(trueRatio(updatedActivitySets[activityId]) * 100) / 100,
    });
  };

  const isAllSetsChecked = (activityId) =>
    checkedSets[activityId]?.every(Boolean);

  const isSomeSetChecked = (activityId) => {
    const sets = checkedSets[activityId] || [];
    return sets.some(Boolean) && !isAllSetsChecked(activityId);
  };

  const toggleAllSets = async (activityId) => {
    const allChecked = isAllSetsChecked(activityId);
    setCheckedSets((prev) => {
      const currentSets = prev[activityId] || [];
      return { ...prev, [activityId]: currentSets.map(() => !allChecked) };
    });
    await api.activity.update(activityId, {
      percentComplete: allChecked ? 0 : 1,
    });
  };

  const calculateScore = async () => {
    let totalSets = 0;
    let numCompletedSets = 0;
    for (const activityId in checkedSets) {
      numCompletedSets += checkedSets[activityId]?.filter(Boolean).length || 0;
      totalSets += checkedSets[activityId].length;
    }

    const score = Math.round((numCompletedSets / totalSets) * 100);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayScoreResults = await api.score.findMany({
      filter: { updatedAt: { after: today } },
    });

    if (todayScoreResults.length > 0) {
      await api.score.update(todayScoreResults[0].id, {
        score: { score: score },
      });
    } else {
      await api.score.create({
        score: { day: today.toISOString().split("T")[0], score: score },
      });
    }

    setTodayScore(score);

    toast({
      description: `Score: ${score} 💪`,
      status: "success",
      position: "top",
    });
  };

  return (
    <Box>
      <Flex
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg="white"
        boxShadow="md"
        zIndex={1000}
        p={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading size="md">
          {new Date().toLocaleDateString("en-US", { weekday: "long" })}
        </Heading>
        <Tag
          size="lg"
          variant="solid"
          colorScheme={
            todayScore >= 75 ? "green" : todayScore >= 50 ? "yellow" : "red"
          }
        >
          <TagLabel>Score: {todayScore}%</TagLabel>
        </Tag>
      </Flex>

      <Container maxW="2xl" py={8} mt="60px">
        <VStack spacing={6} align="stretch">
          {activities.map((activity) => (
            <Box key={activity.id} borderWidth="1px" borderRadius="md" p={6}>
              <Checkbox
                isChecked={isAllSetsChecked(activity.id)}
                isIndeterminate={isSomeSetChecked(activity.id)}
                onChange={() => toggleAllSets(activity.id)}
                colorScheme="green"
                fontWeight="semibold"
                mb={4}
              >
                {activity.activityName}
              </Checkbox>

              <VStack align="stretch" pl={6} spacing={4}>
                {checkedSets[activity.id]?.map((isChecked, setIndex) => (
                  <Checkbox
                    key={`${activity.id}-set-${setIndex}`}
                    isChecked={isChecked}
                    onChange={() =>
                      handleActivitySetsCheck(activity.id, setIndex)
                    }
                    colorScheme="green"
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
          <Button variant="solid" onClick={calculateScore}>
            Finish Workout
          </Button>
        </VStack>
        <Box pt={12} pb={6}>
          <Divider />
          <Text fontSize="xl" fontWeight="bold" mt={3}>
            Monthly Stats
          </Text>
        </Box>
        <Flex maxW="2xl" gap={4} direction={{ base: "column", sm: "row" }}>
          <Container
            py={8}
            borderRadius="lg"
            borderWidth="1px"
            width={["100%", "50%"]}
          >
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
              This month's progress 📈
            </Text>
            <ProgressGraph width="100%" />
          </Container>
          <Container
            py={8}
            borderRadius="lg"
            borderWidth="1px"
            width={["100%", "50%"]}
          >
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
              Average Completion 📊
            </Text>
            <AverageCompletion />
          </Container>
        </Flex>
      </Container>
    </Box>
  );
};

export default Program;
