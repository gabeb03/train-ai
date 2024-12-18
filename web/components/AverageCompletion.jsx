import { Text, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getWorkoutScores } from "./ProgressGraph";

export const AverageCompletion = () => {
  const [avg, setAvg] = useState("-");

  useEffect(() => {
    const fetchContributionData = async () => {
      const flatData = (await getWorkoutScores()).flat();
      const today = new Date().getDate();
      let totalScore = 0;
      for (let i = 0; i < today - 1; i++) {
        totalScore += flatData[i].score == -1 ? 0 : flatData[i].score;
      }
      setAvg(Math.round(totalScore / today));
    };

    fetchContributionData();
  }, []);
  return (
    <Box textAlign="center">
      <Text
        fontWeight="bold"
        fontSize="72px"
        color={avg >= 75 ? "green.500" : avg >= 50 ? "yellow.500" : "red.500"}
      >
        {avg}%
      </Text>
      <Text color="gray.500" fontSize="xs" pt={5}>
        On average, you complete {avg}% of your workouts
      </Text>
    </Box>
  );
};

export default AverageCompletion;
