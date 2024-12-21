import { Button, Flex, Text } from "@chakra-ui/react";

import ChatNavItem from "./ChatNavItem";

import { useChat } from "../hooks/useChat";
import { groupByDateBuckets } from "../lib/utils";

const LeftNav = (props) => {
  const { chats, clearChat } = useChat();

  const groupedChats = groupByDateBuckets(chats, "createdAt");

  return (
    <Flex
      direction="column"
      width="260px"
      borderRightColor="gray.200"
      borderRightWidth="1px"
    >
      <Flex direction="column" flex="1" pt={2} px={3} gap={4}>
        <Button
          variant="outline"
          borderRadius="md"
          borderColor="gray.200"
          borderWidth="1px"
          _hover={{ bgColor: "white" }}
          p={2}
          gap={3}
          onClick={clearChat}
        >
          <Text>New Chat</Text>
        </Button>
        {Object.entries(groupedChats).map(([dateGroup, chatGroup]) => (
          <Flex key={dateGroup} direction="column" gap={1}>
            <Text fontSize="xs" color="gray.600">
              {dateGroup}
            </Text>
            {chatGroup.map((chat) => (
              <ChatNavItem key={chat.id} chat={chat} />
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default LeftNav;
