import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React, { useContext, useState } from "react";
import Link from "next/link";
import NavLoginButtonContext from "../../Context/NavLogInButtonContext";
import { BiMenu } from "react-icons/bi";
import LogOutDialog from "../dashboard/LogOutDialog";
import Router from "next/router";
export default function NavBarButtons() {
  const navLoginButtonContext = useContext(NavLoginButtonContext);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const onLogoutDialogClose = () => setIsLogoutDialogOpen(false);
  return (
    <Flex flex={1} flexDirection="row" justifyContent="space-around">
      <Button variant="ghost" color="white" colorScheme="blackAlpha">
        FAQ
      </Button>
      <Button variant="ghost" color="white" colorScheme="blackAlpha">
        STRIVE Learning Model
      </Button>

      <Button variant="ghost" color="white" colorScheme="blackAlpha">
        STRIVE Mobile App
      </Button>
      <Button
        variant="solid"
        shadow="lg"
        backgroundColor="#ffffff"
        color="#00adb5"
        colorScheme="whiteAlpha"
        onClick={() => {
          navLoginButtonContext.isLoggedIn
            ? setIsLogoutDialogOpen(true)
            : Router.push("/login");
        }}
      >
        {navLoginButtonContext.isLoggedIn ? "LOG OUT" : "LOG IN"}
      </Button>
      <LogOutDialog isOpen={isLogoutDialogOpen} onClose={onLogoutDialogClose} />
    </Flex>
  );
}
