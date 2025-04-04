/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Badge,
  Center,
  Box,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Container,
  Spinner,
} from "@chakra-ui/react";

const User = () => {
  const [authenticated, setAuthenticated] = useState(null); // null means loading

  useEffect(() => {
    let isMounted = true;

    async function getUserInfo() {
      try {
        const response = await fetch("/api/user");

        // Only update state if component is still mounted
        if (isMounted) {
          setAuthenticated(response.status === 200);
        }
      } catch (error) {
        if (isMounted) {
          setAuthenticated(false);
        }
      }
    }

    getUserInfo();

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container maxW="container.lg" py={10}>
      <Center flexDirection="column" h="50vh">
        <Heading as="h2" mb={6}>
          User Access
        </Heading>

        {authenticated === null ? (
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        ) : authenticated ? (
          <Badge colorScheme="green" fontSize="lg" p={3}>
            This is the user page.
          </Badge>
        ) : (
          <Box textAlign="center">
            <Badge colorScheme="red" fontSize="lg" p={3} mb={4}>
              You do not have the required role to access this page.
            </Badge>

            <Alert status="warning" borderRadius="md" mt={4}>
              <AlertIcon />
              <Text>
                You need to be assigned the 'user' role to view this content.
              </Text>
            </Alert>
          </Box>
        )}
      </Center>
    </Container>
  );
};

export default User;
