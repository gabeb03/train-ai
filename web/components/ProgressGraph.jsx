import React, { useEffect, useState } from "react";
import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { api } from "../api";

const getDaysInCurrentMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const dataLen = Math.ceil(
  7 - (getDaysInCurrentMonth() % 7) + getDaysInCurrentMonth()
);

export const getWorkoutScores = async () => {
  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const dayOfWeek = firstDayOfMonth.getDay();

  const data = [];

  let counter = 0;
  for (let i = 0; i < dataLen / 7; i++) {
    data.push([]);
    for (let j = 0; j < 7; j++) {
      if (
        counter - dayOfWeek < 0 ||
        counter + dayOfWeek > getDaysInCurrentMonth() - 1
      ) {
        data.at(-1).push({
          date: null,
          score: -1,
        });
      } else {
        const currentDate = new Date(
          firstDayOfMonth.getTime() +
            (i * 7 + j - dayOfWeek) * 24 * 60 * 60 * 1000
        );

        // TODO: make only 1 API call, getting all the stats for the month
        const scoreResults = await api.score.findMany({
          filter: {
            AND: [
              {
                updatedAt: {
                  after: new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate() - 1,
                    23,
                    59,
                    0,
                    0
                  ),
                  before: new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate() + 1,
                    0,
                    0,
                    0,
                    0
                  ),
                },
              },
            ],
          },
        });

        data.at(-1).push({
          date: currentDate,
          score: scoreResults[0] ? scoreResults[0].score : -1,
        });
      }
      counter++;
    }
  }

  return data;
};

export const ProgressGraph = ({ width = "full" }) => {
  const [contributionData, setContributionData] = useState([]);

  useEffect(() => {
    const fetchContributionData = async () => {
      const data = await getWorkoutScores();
      setContributionData(data);
    };

    fetchContributionData();
  }, []);

  const getColorIntensity = (score) => {
    if (score <= 100 && score > 80) {
      return "green.500";
    } else if (score >= 80 && score > 60) {
      return "green.400";
    } else if (score >= 60 && score > 40) {
      return "green.300";
    } else if (score >= 40 && score > 20) {
      return "green.200";
    } else if (score >= 20 && score > 0) {
      return "green.100";
    }

    return "gray.200";
  };

  return (
    <Box bg="white" width={width}>
      <Flex direction="column" gap={1}>
        {contributionData.map((week, weekIndex) => (
          <Flex key={weekIndex} gap={1}>
            {week.map((day, dayIndex) => (
              <Tooltip
                key={dayIndex}
                label={
                  day.date
                    ? `${day.date.toDateString()}: ${
                        day.score == -1 ? "No data" : day.score + "% completed"
                      }`
                    : "No data"
                }
              >
                <Box
                  w={7}
                  h={7}
                  bg={getColorIntensity(day.score)}
                  borderRadius="sm"
                />
              </Tooltip>
            ))}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
