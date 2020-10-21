import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Spinner,
  useColorMode,
} from "@chakra-ui/core";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import { ProductItem } from "../components/ProductItem";
import { stripeDB } from "../utils/stripeDB";
import { FiShoppingCart } from "react-icons/fi";
import { Header } from "../components/Header";
import Link from "next/link";
import { GradientLine } from "../components/gradientLine";
import { Layout } from "../components/Layout";
import { Footer } from "../components/Footer";

type CustomProduct = {
  productData: Stripe.Product;
  price: Stripe.Price;
};

type Props = {
  updatedProducts: CustomProduct[];
};

const Home: React.FC<Props> = ({ updatedProducts }) => {
  return (
    <Layout>
      <GradientLine />

      <Header>
        <Link href="/cart">
          <Button _hover={{ color: "blue.500" }} mx={4}>
            <Icon as={FiShoppingCart} />
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
        {updatedProducts &&
          updatedProducts.map((product: CustomProduct) => (
            <ProductItem key={product.productData.id} productData={product} />
          ))}
      </Grid>
      <Footer />
    </Layout>
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

  return {
    props: { updatedProducts },
  };
};
