import { ArrowBackIcon } from "@chakra-ui/icons"; // Chakra's built-in back arrow icon
import { CircularProgress, Flex, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { EnterHeight } from "../components/EnterHeight";
import { EnterWeight } from "../components/EnterWeight";
import { GenderSelectionPage } from "../components/GenderSelection";
import { SportSelection } from "../components/SportSelection";

export const SignupForm = () => {
  const [userMetadata, setUserMetadata] = useState({
    sex: "",
    weight: 0,
    height: 0,
    experienceLevelMap: {},
  });
  const [stepNum, setStepNum] = useState(1);

  const onNextStep = () => {
    setStepNum((prev) => prev + 1);
  };

  const onPreviousStep = () => {
    if (stepNum > 1) {
      setStepNum((prev) => prev - 1);
    }
  };

  const signupSteps = [
    <GenderSelectionPage
      nextPageCallback={onNextStep}
      setUserMetadata={setUserMetadata}
    />,
    <EnterWeight
      nextPageCallback={onNextStep}
      setUserMetadata={setUserMetadata}
    />,
    <EnterHeight
      nextPageCallback={onNextStep}
      setUserMetadata={setUserMetadata}
    />,
    <SportSelection setUserMetadata={setUserMetadata} />,
  ];

  useEffect(() => {
    console.log(userMetadata);
  }, [userMetadata]);

  return (
    <>
      {signupSteps[stepNum - 1]}
      <Flex
        position="absolute"
        bottom="4"
        left="4"
        direction="column"
        align="center"
      >
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Go back"
          onClick={onPreviousStep}
          isDisabled={stepNum === 1}
          mb="2"
        />
      </Flex>
      <Flex
        position="absolute"
        bottom="4"
        right="4"
        direction="column"
        align="center"
      >
        <CircularProgress
          value={Math.round((stepNum / signupSteps.length) * 100)}
          size="40px"
          color="gray.500"
        />
        <Text mb="2" mt="1" fontWeight="semibold">
          Step {stepNum}/{signupSteps.length}
        </Text>
      </Flex>
    </>
  );
};
