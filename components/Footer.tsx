import { Link, Text } from "@chakra-ui/core";
import { Layout } from "./Layout";

export const Footer = () => {
  return (
    <Layout>
      <Text color="gray.500" py={8}>
        Made with ❤️ by{" "}
        <Link
          href="https://github.com/Gabriel2233"
          textDecor="underline"
          target="_blank"
        >
          Gabriel Tiso
        </Link>
      </Text>
    </Layout>
  );
};
