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

export default function CreateAccountSuccessDialog(props) {
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
        <ModalHeader>Account Log in Credentials</ModalHeader>
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
