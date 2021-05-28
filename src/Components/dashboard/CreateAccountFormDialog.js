import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  useToast,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";

export default function CreateAccountFormDialog(props) {
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [yearLevel, setYearLevel] = useState("");

  useEffect(() => {
    setSectionList([]);
  }, []);

  const toast = useToast();
  // const [accountType, setAccountType] = useState("");
  async function submitAccountForm() {
    if (
      firstName == "" ||
      lastName == "" ||
      password == "" ||
      confirmPassword == "" ||
      email == "" ||
      section == "" ||
      yearLevel == ""
    ) {
      var form = {
        firstName: firstName,
        middleInitial: middleInitial,
        lastName: lastName,
        suffix: suffix,
        password: confirmPassword,
        email: email,
        section: section,
        yearLevel: yearLevel,
      };
      console.log(form);
      toast({
        title: "Empty text field found!",
        description: "Please fill out all the required text fields",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "bottom-right",
      });
    } else {
      //Create Account Form
      var form = {
        firstName: firstName,
        middleInitial: middleInitial,
        lastName: lastName,
        suffix: suffix,
        password: confirmPassword,
        personalEmail: email,
        sectionName: section,
        yearLevel: yearLevel,
      };
      console.log(form);
      //POST Request to attempt creating a new account.
      var attemptCreateAccount = await axios
        .post("https://opdbs.vercel.app/api/student", form)
        .then((resp) => {
          console.log(resp.data);
          return toast({
            title: "Account successfully created!",
            description: "Account has been created and is accessible now.",
            status: "success",
            duration: 2500,
            isClosable: true,
            position: "top",
          });
        })
        .then((resp) => {
          return props.onClose();
        })
        .catch((e) => {
          return console.log(e);
        });
    }
  }

  async function loadSections(props) {
    console.log("YEAR LEVEL: " + props.yearLevel);
    //Load all sections when user picks year level
    var getSectionList = await axios
      .get(`https://opdbs.vercel.app/api/sections/${props.yearLevel}`)
      .then((resp) => {
        console.log(resp.data);
        setSectionList(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeOnOverlayClick={false}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Firstname</FormLabel>
            <Input
              autoComplete={"new-password"}
              id="fname"
              placeholder="Firstname"
              onChange={(val) => setFirstName(val.target.value)}
            />

            <FormLabel>Middle Initial</FormLabel>
            <Input
              autoComplete={"new-password"}
              id="MI"
              placeholder="Middle Initial"
              onChange={(val) => setMiddleInitial(val.target.value)}
            />
            <FormHelperText>Leave empty if none</FormHelperText>

            <FormLabel>Lastname</FormLabel>
            <Input
              autoComplete={"new-password"}
              id="lname"
              placeholder="Lastname"
              onChange={(val) => setLastName(val.target.value)}
            />

            <FormLabel>Suffix</FormLabel>
            <Input
              placeholder="Suffix"
              autoComplete={"new-password"}
              id="suffix"
              onChange={(val) => setSuffix(val.target.value)}
            />
            <FormHelperText>Leave empty if none</FormHelperText>

            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoComplete={"new-password"}
              onChange={(val) => setEmail(val.target.value)}
            />

            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              autoComplete={"new-password"}
              id="password"
              onChange={(val) => setPassword(val.target.value)}
            />

            <FormLabel>Confirm Password</FormLabel>
            <Input
              placeholder="Confirm Password"
              type="password"
              autoComplete={"new-password"}
              id="cpassword"
              onChange={(val) => setConfirmPassword(val.target.value)}
            />
            <FormHelperText color="red">
              {confirmPassword != password ? "Password does not match" : null}
            </FormHelperText>

            <FormLabel>Year Level</FormLabel>
            <Select
              placeholder="Select year Level"
              onChange={(val) => {
                loadSections({ yearLevel: val.target.value });
                setYearLevel(val.target.value);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Select>

            <FormLabel>Section</FormLabel>
            <Select
              placeholder="Select section"
              onChange={(val) => {
                console.log(val.target.value);
                setSection(val.target.value);
              }}
              disabled={sectionList.length == 0 ? true : false}
            >
              {sectionList.map((val, index) => {
                return (
                  <option value={val.id.sectionName} key={index}>
                    {val.id.sectionName}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={props.onClose}>
            CLOSE
          </Button>
          <Button colorScheme="blue" mr={3} onClick={submitAccountForm}>
            SUBMIT
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
