import React from "react";
import {
  Heading,
  Text,
  Badge,
  Box,
  VStack,
  Code,
  Container,
  Divider,
} from "@chakra-ui/react";

function Home({ authenticated, userInfo }) {
  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center" mb={6}>
          Entra-ID Workshop
        </Heading>

        {authenticated ? (
          <Badge colorScheme="green" fontSize="xl" p={2} alignSelf="center">
            YOU ARE AUTHENTICATED
          </Badge>
        ) : (
          <Badge colorScheme="red" fontSize="xl" p={2} alignSelf="center">
            YOU ARE NOT AUTHENTICATED
          </Badge>
        )}

        <Divider my={4} />

        {userInfo && (
          <Box
            overflowX="auto"
            overflowY="auto"
            maxH="70vh"
            mt={4}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
          >
            <Heading as="h3" size="md" mb={4}>
              User Information
            </Heading>

            {userInfo.clientPrincipal && (
              <VStack align="stretch" spacing={3}>
                <Box>
                  <Text fontWeight="bold">User ID:</Text>
                  <Code p={2} borderRadius="md" width="100%">
                    {userInfo.clientPrincipal.userId}
                  </Code>
                </Box>

                <Box>
                  <Text fontWeight="bold">User Details:</Text>
                  <Code
                    p={2}
                    borderRadius="md"
                    width="100%"
                    display="block"
                    whiteSpace="pre-wrap"
                  >
                    {JSON.stringify(userInfo.clientPrincipal, null, 2)}
                  </Code>
                </Box>

                <Box>
                  <Text fontWeight="bold">Full Authentication Data:</Text>
                  <Code
                    p={2}
                    borderRadius="md"
                    width="100%"
                    display="block"
                    whiteSpace="pre-wrap"
                    fontSize="sm"
                  >
                    {JSON.stringify(userInfo, null, 2)}
                  </Code>
                </Box>
              </VStack>
            )}
          </Box>
        )}
      </VStack>
    </Container>
  );
}

export default Home;
