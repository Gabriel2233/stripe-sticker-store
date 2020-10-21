import {
  Button,
  Flex,
  Icon,
  Image,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/core";
import Stripe from "stripe";
import {
  useShoppingCart,
  formatCurrencyString,
  Product,
} from "use-shopping-cart";

type Props = {
  productData: CustomProduct;
};

type CustomProduct = {
  productData: Stripe.Product;
  price: Stripe.Price;
};

export const ProductItem = ({ productData }: Props) => {
  const { addItem } = useShoppingCart();

  const price = formatCurrencyString({
    value: productData.price.unit_amount,
    currency: "USD",
  });

  const cartItem = {
    name: productData.productData.name,
    description: productData.productData.description,
    currency: productData.price.currency,
    sku: productData.price.id,
    price: productData.price.unit_amount,
    image: productData.productData.images[0],
  };

  const { colorMode } = useColorMode();
  const toast = useToast();
  const { onClose } = useDisclosure();

  const handleAddItem = (item: Product) => {
    addItem(item);

    toast({
      title: "Success!",
      description: `${item.name} was added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      onClose,
    });
  };

  return (
    <Flex
      flexDir="column"
      m={4}
      rounded="8px"
      borderWidth={2}
      backgroundColor={colorMode === "light" ? "gray.50" : "gray.900"}
      p={6}
      align="center"
      justify="center"
    >
      <Text textAlign="start" w="full" pb={6} fontWeight="bolder">
        {productData.productData.name}
      </Text>
      <Image
        src={productData.productData.images[0]}
        w={110}
        h={100}
        alt={productData.productData.name}
      />
      <Flex w="full" align="center" justify="space-between" mt={8}>
        <Text fontWeight="bold" fontSize="26px">
          {price}
        </Text>
        <Button
          color="white"
          bg="blue.500"
          _hover={{ bg: "blue.400" }}
          onClick={() => handleAddItem(cartItem)}
        >
          Add to cart
          <Icon name="arrow-forward" ml={1} />
        </Button>
      </Flex>
    </Flex>
  );
};
