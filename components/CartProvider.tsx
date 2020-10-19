import { ReactNode } from "react";
import { CartProvider as LibCartProvider } from "use-shopping-cart";
import { getStripe } from "../utils/getStripe";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LibCartProvider
      mode="checkout-session"
      currency="USD"
      stripe={getStripe()}
    >
      <> {children}</>
    </LibCartProvider>
  );
};
