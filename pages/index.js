import { Button } from "@chakra-ui/button";
import { HStack, VStack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import Head from "next/head";
import Image from "next/image";
import Colors from "../src/Constants/Colors";
import useWindowSize from "../src/CustomHooks/UseWindows";
export default function Home() {
  const getWindowSize = useWindowSize();
  return (
    <>
      <Head>
        <title>Index</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex {...styleProps.indexWrapper}>
        {/* <Image
          src={"/study_banner.svg"}
          alt="Picture of the author"
          width={600}
          height={500}
        /> */}
        <Flex flexDirection={getWindowSize.width < 960 ? "column" : "row"}>
          <HStack>
            <Heading>LEARN</Heading>
            <Heading>BETTER </Heading>
            <Heading>TOGETHER</Heading>
          </HStack>
        </Flex>
        <Flex
          flexDirection={getWindowSize.width < 960 ? "column" : "row"}
          marginTop="10"
        >
          <Button
            variant="solid"
            backgroundColor={Colors.black}
            color={Colors.white}
            colorScheme="blackAlpha"
          >
            Take a tour
          </Button>

          <Button
            variant="solid"
            backgroundColor={Colors.green}
            color={Colors.white}
            colorScheme="cyan"
          >
            ENROLL NOW!
          </Button>

          <Button
            variant="solid"
            backgroundColor={Colors.black}
            color={Colors.white}
            colorScheme="blackAlpha"
          >
            See Courses
          </Button>
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
};