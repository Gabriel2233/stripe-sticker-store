import { Flex, Grid, Heading } from "@chakra-ui/core";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import { CartProvider } from "../components/CartProvider";
import { ProductItem } from "../components/ProductItem";
import { stripeDB } from "../utils/stripeDB";

type CustomProduct = {
  productData: Stripe.Product;
  price: Stripe.Price;
};

type Props = {
  updatedProducts: CustomProduct[];
};

const Home: React.FC<Props> = ({ updatedProducts }) => {
  console.log(updatedProducts);
  return (
    <CartProvider>
      <Flex flexDir="column" align="center" justify="center" w="full" h="full">
        <Heading size="xl" m={8}>
          Sticker Kingdom
        </Heading>

        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          margin="auto"
          w="90%"
          maxW="980px"
          py={8}
        >
          {updatedProducts &&
            updatedProducts.map((product: CustomProduct) => (
              <ProductItem key={product.productData.id} productData={product} />
            ))}
        </Grid>
      </Flex>
    </CartProvider>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const products = await stripeDB.products.list();

  const prices = await stripeDB.prices.list();

  const updatedProducts = products.data.map((product) => {
    const price = prices.data.find((price) => price.product === product.id);

    const productWithPrice = {
      productData: product,
      price,
    };

    return productWithPrice;
  });

  console.log(updatedProducts);

  return {
    props: { updatedProducts },
  };
};
