import { Button, Flex, Heading } from "@chakra-ui/core";
import { GradientLine } from "../components/gradientLine";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { Footer } from "../components/Footer";

const Success = () => {
  return (
    <Layout>
      <GradientLine />
      <Header>{}</Header>

      <Flex w="70%" align="center" justify="center" my={24} flexDir="column">
        <Heading>Thank you for purchasing some stickers!</Heading>
        <Link href="/">
          <Button
            bg="blue.500"
            _hover={{ bg: "blue.400" }}
            color="white"
            padding={10}
            fontSize="20px"
            border={0}
            borderRadius="sm"
            my={16}
          >
            Continue Shopping
          </Button>
        </Link>
      </Flex>
      <Footer />
    </Layout>
  );
};

export default Success;
