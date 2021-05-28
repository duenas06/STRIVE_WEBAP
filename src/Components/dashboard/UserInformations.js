import { Flex } from "@chakra-ui/layout";
import React from "react";
import { Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
export default function UserInformations(props) {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#ffffff"
      shadow="lg"
      padding="5"
      borderRadius="lg"
      marginBottom="10"
    >
      <VStack alignItems="flex-start" spacing="-1">
        <Text fontWeight="bold">ACCOUNT NAME</Text>
        <Text>
          {props.data.lastName},{props.data.firstName}{" "}
          {props.data.middleInitial}
        </Text>
        <br />
        <Text fontWeight="bold">ACCOUNT ID</Text>
        <Text>{props.data.id}</Text>
        <br />

        {props.data.type == 1 ? null : (
          <>
            <Text fontWeight="bold">YEAR LEVEL</Text>
            <Text>{props.data.yearLevel}</Text>
            <br />

            <Text fontWeight="bold">SECTION NAME</Text>
            <Text>{props.data.sectionName}</Text>
          </>
        )}
      </VStack>
    </Flex>
  );
}
