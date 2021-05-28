import React, { useContext } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import NavLoginButtonContext from "../../Context/NavLogInButtonContext";
export default function LogOutDialog(props) {
  const navLoginButtonContext = useContext(NavLoginButtonContext);
  return (
    <>
      <AlertDialog isOpen={props.isOpen} onClose={props.onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Log out
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to log out?</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={props.onClose}>Cancel</Button>
              <Link href={navLoginButtonContext.isLoggedIn ? "/" : "/login"}>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    navLoginButtonContext.isLoggedIn
                      ? navLoginButtonContext.handleLoggedInState()
                      : null;
                    props.onClose();
                  }}
                  ml={3}
                >
                  Log out
                </Button>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
