import { ChakraProvider } from "@chakra-ui/react";
import NavigationBar from "../src/Components/index/NavigationBar";
import { NavLoginButtonContextProvider } from "../src/Context/NavLogInButtonContext";
import { UserDataContextProvider } from "../src/Context/UserDataContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NavLoginButtonContextProvider>
        <NavigationBar />
        <UserDataContextProvider>
          <Component {...pageProps} />
        </UserDataContextProvider>
      </NavLoginButtonContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
