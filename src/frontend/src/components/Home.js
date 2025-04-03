import React from "react";
import { Heading, Text, Badge, Center, VStack } from "@chakra-ui/react";

function Home({ authenticated, userInfo }) {
  return (
    <Center h="100vh">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" textAlign="center">
          Entra-ID Workshop
        </Heading>
        {authenticated ? (
          <Badge colorScheme="green" fontSize="xl" p={2}>
            You are AUTHENTICATED
          </Badge>
        ) : (
          <Badge colorScheme="red" fontSize="xl" p={2}>
            You are NOT AUTHENTICATED
          </Badge>
        )}
        <Text whiteSpace="pre">
          {userInfo && JSON.stringify(userInfo, null, 2)}
        </Text>
      </VStack>
    </Center>
  );
}

export default Home;

