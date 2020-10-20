import { Flex } from "@chakra-ui/core";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex flexDir="column" align="center" justify="center" w="full" h="full">
      {children}
    </Flex>
  );
};
