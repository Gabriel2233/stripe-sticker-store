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
import { CartEntry, useShoppingCart } from "use-shopping-cart";
import { FiTrash } from "react-icons/fi";
import { MdRemoveCircle } from "react-icons/md";

type Props = {
  cartData: CartEntry;
};

export const CartItem = ({ cartData }: Props) => {
  const { removeItem, decrementItem } = useShoppingCart();

  const { colorMode } = useColorMode();
  const toast = useToast();
  const { onClose } = useDisclosure();

  const handleRemoveItem = (item: CartEntry) => {
    removeItem(item.sku);

    toast({
      title: "Item removed.",
      description: `${item.name} was removed from your cart.`,
      status: "info",
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
        {cartData.name}
      </Text>
      <Image src={cartData.image} w={110} h={100} />
      <Flex w="full" align="center" justify="space-between" mt={8}>
        <Text fontWeight="bold" fontSize="26px">
          {cartData.formattedValue}
        </Text>

        <Flex>
          <Button
            mx={2}
            onClick={() => decrementItem(cartData.sku)}
            _hover={{ color: "red.300" }}
          >
            <Icon as={MdRemoveCircle} />
          </Button>

          <Button
            onClick={() => handleRemoveItem(cartData)}
            _hover={{ color: "red.300" }}
          >
            <Icon as={FiTrash} />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
