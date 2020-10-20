import { Flex, Icon, IconButton, Text, useColorMode } from "@chakra-ui/core";
import { ReactNode } from "react";
import { BiCrown } from "react-icons/bi";

export const Header = ({ children }: { children: ReactNode }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex w="70%" align="center" justify="space-between" py={10}>
      <Text fontWeight="bold">
        <Icon as={BiCrown} fontSize="30px" mr={2} />
        Sticker Kingdom
      </Text>
      <Flex align="center" justify="center">
        {children}
        <IconButton
          aria-label={`Switch to ${
            colorMode === "light" ? "dark" : "light"
          } mode`}
          variant="ghost"
          color="current"
          ml="2"
          fontSize="20px"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? "moon" : "sun"}
        />
      </Flex>
    </Flex>
  );
};
