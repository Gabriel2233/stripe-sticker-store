import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import { CartProvider } from "../components/CartProvider";
import { customTheme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <ThemeProvider theme={customTheme}>
        <ColorModeProvider value="light">
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </CartProvider>
  );
}

export default MyApp;
