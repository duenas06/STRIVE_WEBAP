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
  CheckboxGroup,
  Checkbox,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";

export default function CreateSectionFormDialog(props) {
  // const [firstName, setFirstName] = useState("");
  // const [middleInitial, setMiddleInitial] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [suffix, setSuffix] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [section, setSection] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [yearLevel, setYearLevel] = useState("");

  const toast = useToast();
  // const [accountType, setAccountType] = useState("");
  async function submitSectionForm() {
    if (
      // firstName == "" ||
      // lastName == "" ||
      // password == "" ||
      // confirmPassword == "" ||
      // email == "" ||
      section == "" ||
      yearLevel == "" ||
      studentList.length == 0
    ) {
      toast({
        title: "Empty text field found!",
        description: "Please fill out all the required text fields",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "bottom-right",
      });
    } else {
      //Create Section Form
      var form = {
        sectionName: section,
        yearLevel: yearLevel,
        studentList: studentList,
      };
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
            position: "bottom-right",
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

  async function loadAllStudents() {
    var getAllStudentsInfo = await axios
      .get("https://opdbs.vercel.app/api/students")
      .then((response) => {
        return setStudentList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    loadAllStudents();
  }, []);

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
        <ModalHeader>Create New Section</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Year Level</FormLabel>
            <Select
              placeholder="Select year Level"
              onChange={(val) => {
                loadSections({ yearLevel: val.target.value });
                console.log("STUDENT LIST" + studentList);
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

            <FormLabel>Student List</FormLabel>
            <FormHelperText>
              Select student by ticking the checkbox.
            </FormHelperText>
            <CheckboxGroup
              onChange={(val) => {
                return setStudentList(val);
              }}
            >
              {studentList.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    value={value.id.id}
                    mt="5"
                    onChange={(e) => {
                      e.preventDefault();
                      // setStudentList((prevData) => {
                      //   return prevData.concat(e.target.checked);
                      // });
                    }}
                  >
                    {value.id.lastName}, {value.id.firstName}{" "}
                    {value.id.middleInitial}
                  </Checkbox>
                );
              })}
            </CheckboxGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={props.onClose}>
            CLOSE
          </Button>
          <Button colorScheme="blue" mr={3} onClick={submitSectionForm}>
            SUBMIT
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
