import { Flex } from "@chakra-ui/layout";
import React, { useContext, useState } from "react";
import Colors from "../../Constants/Colors";
import { Button } from "@chakra-ui/button";
import Link from "next/link";
import { GrScorecard } from "react-icons/gr";
import { IoIosPersonAdd, IoIosCreate } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";
import NavLoginButtonContext from "../../Context/NavLogInButtonContext";
import UserDataContext from "../../Context/UserDataContext";
import CreateAccountFormDialog from "./CreateAccountFormDialog";
import CreateSectionFormDialog from "../../Components/dashboard/CreateSectionFormDialog";
import { useDisclosure } from "@chakra-ui/hooks";
import LogOutDialog from "./LogOutDialog";

export default function MiniNavBar() {
  const navLoginButtonContext = useContext(NavLoginButtonContext);
  const userDataContext = useContext(UserDataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isCreateSectionDialogOpen, setIsCreateSectionDialogOpen] = useState(
    false
  );
  const onCreateSectionDialogClose = () => setIsCreateSectionDialogOpen(false);
  const onCreateSectionDialogOpen = () => setIsCreateSectionDialogOpen(true);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const onLogoutDialogClose = () => setIsLogoutDialogOpen(false);
  return (
    <Flex
      flexDirection="column"
      justifyContent="stretch"
      backgroundColor="#ffffff"
      shadow="lg"
      padding="5"
      borderRadius="lg"
    >
      {userDataContext.data.type == 0 ? null : (
        <>
          <Button
            leftIcon={<IoIosPersonAdd color={Colors.green} size={25} />}
            variant="ghost"
            justifyContent="left"
            onClick={onOpen}
          >
            Create New Account
          </Button>
          <br />
          <Button
            leftIcon={<IoIosCreate color={Colors.green} size={25} />}
            variant="ghost"
            justifyContent="left"
            onClick={onCreateSectionDialogOpen}
          >
            Create New Section
          </Button>
          <br />
        </>
      )}
      <Button
        leftIcon={<FaListAlt color={Colors.green} size={25} />}
        variant="ghost"
        justifyContent="left"
      >
        View Scores
      </Button>
      <br />
      <Button
        variant="solid"
        shadow="lg"
        backgroundColor={Colors.green}
        color={Colors.white}
        colorScheme="cyan"
        onClick={() => {
          navLoginButtonContext.isLoggedIn ? setIsLogoutDialogOpen(true) : null;
        }}
      >
        {navLoginButtonContext.isLoggedIn ? "LOG OUT" : "LOG IN"}
      </Button>
      <CreateAccountFormDialog isOpen={isOpen} onClose={onClose} />
      <CreateSectionFormDialog
        isOpen={isCreateSectionDialogOpen}
        onClose={onCreateSectionDialogClose}
      />
      <LogOutDialog isOpen={isLogoutDialogOpen} onClose={onLogoutDialogClose} />
    </Flex>
  );
}
