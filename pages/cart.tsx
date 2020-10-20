import { Button, Flex, Grid, Heading, Icon } from "@chakra-ui/core";
import { useShoppingCart, CartEntry } from "use-shopping-cart";
import { GradientLine } from "../components/gradientLine";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { FiHome } from "react-icons/fi";
import Link from "next/link";
import { CartItem } from "../components/CartItem";

const Cart = () => {
  const { cartDetails, cartCount, formattedTotalPrice } = useShoppingCart();

  let entries = [];

  for (const item in cartDetails) {
    const entry = cartDetails[item];

    entries.push(entry);
  }

  return (
    <Layout>
      <GradientLine />
      <Header>
        <Link href="/">
          <Button mx={4} _hover={{ color: "blue.500" }}>
            <Icon as={FiHome} />
          </Button>
        </Link>
      </Header>

      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        margin="auto"
        w="90%"
        maxW="980px"
        py={8}
      >
        {cartCount !== 0 &&
          entries.map((entry: CartEntry) => (
            <CartItem cartData={entry} key={entry.sku} />
          ))}
      </Grid>

      <Flex w="70%" align="center" justify="space-between" my={10}>
        <Heading size="md">Total amount: {formattedTotalPrice}</Heading>
        <Button
          bg="blue.500"
          _hover={{ bg: "blue.400" }}
          padding={6}
          border={0}
          borderRadius="sm"
          color="white"
        >
          Checkout
          <Icon name="arrow-forward" ml={1} />
        </Button>
      </Flex>
    </Layout>
  );
};

export default Cart;
