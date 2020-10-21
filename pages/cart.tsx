import {
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/core";
import { useShoppingCart, CartEntry } from "use-shopping-cart";
import { GradientLine } from "../components/gradientLine";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { FiHome, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { CartItem } from "../components/CartItem";
import { FormEvent, useState } from "react";
import { fetchPostJSON } from "../utils/api-helpers";
import { Footer } from "../components/Footer";

const Cart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { onClose } = useDisclosure();
  const toast = useToast();

  const {
    redirectToCheckout,
    cartDetails,
    cartCount,
    formattedTotalPrice,
  } = useShoppingCart();

  let entries = [];

  for (const item in cartDetails) {
    const entry = cartDetails[item];

    entries.push(entry);
  }

  const handleProceedToCheckout = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetchPostJSON(
        "/api/checkout_sessions/cart",
        cartDetails
      );

      redirectToCheckout({ sessionId: res.id });

      setLoading(false);
    } catch (err) {
      toast({
        title: "An error ocurred",
        status: "error",
        onClose,
        duration: 3000,
        description: err.message,
        isClosable: true,
      });
    }
  };

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
        {cartCount === 0 ? (
          <Flex align="center" justify="center" w="full" flexDir="column">
            <Icon as={FiShoppingCart} size="44px" color="gray.500" my={8} />
            <Heading size="xl" color="gray.500" my={2}>
              Your cart is empty.
            </Heading>
          </Flex>
        ) : (
          <>
            <Heading size="md">Total amount: {formattedTotalPrice}</Heading>
            <Button
              w="30%"
              p={8}
              cursor="pointer"
              bg="blue.500"
              _hover={{ bg: "blue.400" }}
              padding={6}
              border={0}
              borderRadius="sm"
              color="white"
              onClick={handleProceedToCheckout}
            >
              {loading ? (
                <>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                  />
                </>
              ) : (
                <>
                  Checkout <Icon name="arrow-forward" ml={1} />
                </>
              )}
            </Button>
          </>
        )}
      </Flex>
      <Footer />
    </Layout>
  );
};

export default Cart;
