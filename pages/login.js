import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import NavigationBar from "../src/Components/index/NavigationBar";
import Colors from "../src/Constants/Colors";
import NavLoginButtonContext from "../src/Context/NavLogInButtonContext";
import useWindowSize from "../src/CustomHooks/UseWindows";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import { Spinner } from "@chakra-ui/spinner";
import UserDataContext from "../src/Context/UserDataContext";

export default function Login() {
  const getWindowSize = useWindowSize();
  const navLoginButtonContext = useContext(NavLoginButtonContext);
  const userDataContext = useContext(UserDataContext);
  const toast = useToast();
  const [accountID, setAccountID] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifyingLogin, setIsVerifyingLogin] = useState(false);

  async function verifyLogin() {
    setIsVerifyingLogin(true);
    const jsonData = {
      id: accountID,
      password: password,
    };
    var accountCheck = await axios
      .post("https://opdbs.vercel.app/api/checkid/login", jsonData)
      .then((resp) => {
        if (typeof resp.data !== "object" && resp.data !== null) {
          toast({
            title: "Log in failed",
            description: resp.data,
            status: "error",
            duration: 2500,
            isClosable: true,
            position: "bottom-right",
          });
        } else {
          userDataContext.setUserData({
            dataObject: resp.data,
          });
          navLoginButtonContext.handleLoggedInState();
          Router.push("/dashboard");
          toast({
            title: "Log in successful",
            description: "Loading dashboard...",
            status: "success",
            duration: 2500,
            isClosable: true,
            position: "bottom-right",
          });
        }
        return (resp = resp.data);
      })
      .then((resp) => {
        setIsVerifyingLogin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // useEffect(() => {
  //   // console.log(navLoginButtonContext.isLoggedIn);
  // }, []);
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex {...styleProps.indexWrapper}>
        <Heading color={Colors.black}>Login</Heading>
        <Flex
          w={
            getWindowSize.width < 960
              ? getWindowSize.width * 0.7
              : getWindowSize.width * 0.3
          }
          {...styleProps.formCardContainer}
        >
          <Input
            onChange={(value) => setAccountID(value.target.value)}
            placeholder="Account ID"
            marginBottom="3"
            autoFocus
          />
          <Input
            onChange={(value) => setPassword(value.target.value)}
            placeholder="Password"
            type="password"
          />
          <Text
            marginBottom="5"
            textAlign="right"
            fontSize="13"
            fontWeight="bold"
            cursor="pointer"
          >
            Forgot Password?
          </Text>
          <Link
            href={navLoginButtonContext.isLoggedIn ? "/dashboard" : "/login"}
          >
            <Button
              backgroundColor={Colors.green}
              color={Colors.white}
              colorScheme="cyan"
              onClick={verifyLogin}
              disabled={isVerifyingLogin}
            >
              {isVerifyingLogin ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor={Colors.lightGreen}
                  color={Colors.white}
                  size="md"
                />
              ) : (
                "LOGIN"
              )}
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

const styleProps = {
  indexWrapper: {
    height: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bgColor: Colors.white,
  },
  formCardContainer: {
    flexDirection: "column",
    bgColor: "#ffffff",
    marginTop: "10",
    marginBottom: "16",
    borderRadius: "lg",
    shadow: "lg",
    padding: "5",
  },
};
