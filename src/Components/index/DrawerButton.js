import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Flex } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/modal";
import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { Divider } from "@chakra-ui/layout";
import Colors from "../../Constants/Colors";
import NavLoginButtonContext from "../../Context/NavLogInButtonContext";
import Router from "next/router";
import LogOutDialog from "../dashboard/LogOutDialog";
export default function DrawerButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navLoginButtonContext = useContext(NavLoginButtonContext);

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const onLogoutDialogClose = () => setIsLogoutDialogOpen(false);
  return (
    <Flex flex={1} flexDirection="row" justifyContent="flex-end">
      <Button
        ref={btnRef}
        variant="ghost"
        color="white"
        colorScheme="blackAlpha"
        onClick={onOpen}
      >
        <GiHamburgerMenu color={Colors.white} size={30.0} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>MENU</DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="column" justifyContent="stretch">
              <Button {...styleProps.drawerButtons} onClick={onClose}>
                FAQ
              </Button>
              <Button {...styleProps.drawerButtons} onClick={onClose}>
                STRIVE Learning Model
              </Button>
              <Button {...styleProps.drawerButtons} onClick={onClose}>
                STRIVE Mobile App
              </Button>

              <Button
                variant="solid"
                shadow="lg"
                backgroundColor="#00adb5"
                color={Colors.white}
                colorScheme="cyan"
                onClick={() => {
                  onClose();
                  navLoginButtonContext.isLoggedIn
                    ? setIsLogoutDialogOpen(true)
                    : Router.push("/login");
                }}
              >
                {navLoginButtonContext.isLoggedIn ? "LOG OUT" : "LOG IN"}
              </Button>
            </Flex>
          </DrawerBody>
          <DrawerFooter>THE FOOTER</DrawerFooter>
        </DrawerContent>
      </Drawer>
      <LogOutDialog isOpen={isLogoutDialogOpen} onClose={onLogoutDialogClose} />
    </Flex>
  );
}

const styleProps = {
  drawerButtons: {
    variant: "ghost",
    color: Colors.green,
    colorScheme: "blackAlpha",
    justifyContent: "flex-start",
    marginBottom: "5",
  },
};
