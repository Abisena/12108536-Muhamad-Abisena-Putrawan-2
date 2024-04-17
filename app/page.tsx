"use client";

import { useState } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  VStack,
  Container,
  Box,
  Spacer,
  useToast,
  useColorMode,
  Flex,
  chakra,
} from "@chakra-ui/react";
import axios from "axios";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", { email, password });
      console.log(response.data);

      if (response) {
        toast({
          title: "Login successful",
          description: "You have been logged in successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          window.location.assign("/dashboard");
        }, 1500);

        setEmail("");
        setPassword("");
      } else {
        toast({
          title: "Login failed",
          description: "You do not have a valid account to log in.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        setEmail("");
        setPassword("");

      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "Login failed",
        description: "An error occurred while logging in",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      window.location.assign("/404");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex flexDir="column" minH="100vh">
      <Container
        as="main"
        py={6}
        px={4}
        maxW="container.xl"
        w="100%"
        justifyContent="center"
        minH="calc(100vh - 12rem)"
        mx="auto"
        id="centered-form"
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          w="100%"
          maxW="30rem"
          p="4"
        >
          <VStack align="flex-start" spacing="20px" mb="30px">
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w={["90%", "60%", "40%"]}
              textAlign="center"
            >
              <Text fontWeight="semibold" fontSize="4xl">
                GoKasir!
              </Text>
              <FormControl>
                <FormLabel fontWeight="semibold">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email Address"
                  w="100%"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold">Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  w="100%"
                />
              </FormControl>
              <Button
                w="100%"
                mt={20}
                bg="purple.600"
                color="white"
                isLoading={isLoading}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
          </VStack>
        </Flex>
      </Container>
      <chakra.footer
        display="flex"
        flexGrow="0"
        w="100%"
        bg="purple.600"
        color="white"
        p={3}
        justifyContent="center"
        pos="fixed"
        bottom="0"
        left={0}
        right={0}
        id="footer"
        className="bottom-container"
      >
        &copy; {new Date().getFullYear()} GoKasir.com
      </chakra.footer>
    </Flex>
  );
};

export default FormLogin;