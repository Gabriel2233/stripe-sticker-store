import { Button, Flex, Image, Text } from "@chakra-ui/core";
import Stripe from "stripe";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

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

  return (
    <Flex
      flexDir="column"
      m={4}
      borderWidth={2}
      borderColor="gray.200"
      p={6}
      align="center"
      justify="center"
    >
      <Image src={productData.productData.images[0]} w={110} h={100} />
      <Flex w="full" align="center" justify="space-between" mt={2}>
        <Flex flexDir="column">
          <Text>{productData.productData.name}</Text>
          <Text>{price}</Text>
        </Flex>
        <Button>Add to cart</Button>
      </Flex>
    </Flex>
  );
};
