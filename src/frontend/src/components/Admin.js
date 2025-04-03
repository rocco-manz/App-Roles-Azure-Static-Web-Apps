/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Badge,
  Center,
  Box,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Container,
} from "@chakra-ui/react";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      const response = await fetch("/api/master");
      setAuthenticated(response.status === 200);
    }

    getUserInfo();
  }, []);

  return (
    <Container maxW="container.lg" py={10}>
      <Center flexDirection="column" h="50vh">
        <Heading as="h2" mb={6}>
          Admin Access
        </Heading>

        {authenticated ? (
          <Badge colorScheme="green" fontSize="lg" p={3}>
            This is the admin page.
          </Badge>
        ) : (
          <Box textAlign="center">
            <Badge colorScheme="red" fontSize="lg" p={3} mb={4}>
              You do not have the required role to access this page.
            </Badge>

            <Alert status="warning" borderRadius="md" mt={4}>
              <AlertIcon />
              <Text>
                You need to be assigned the 'admin' role to view this content.
              </Text>
            </Alert>
          </Box>
        )}
      </Center>
    </Container>
  );
};

export default Admin;

