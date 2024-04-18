import React from "react";
import {
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Link,
  Spacer,
  Box,
} from "@chakra-ui/react";

export default function NotFound() {
  return (
    <>
      <Container
        mt="150px"
        centerContent
        p={5}
        bg="white"
        boxShadow="base"
        borderRadius="12px"
        w="min(100%, 500px)"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={5}
        >
          <Box fontSize="4xl" fontWeight="bold">
            404
          </Box>
          <Heading
            fontSize="2xl"
            fontWeight="semibold"
            color="gray.900"
            textAlign="center"
          >
            Page not found
          </Heading>
          <Text fontSize="md" color="gray.600" textAlign="center">
            Sorry, Sepertinya Kamu nggak punya Akunn 😂🤣
          </Text>
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={3}
          >
            <Button
              size="md"
              variant="solid"
              colorScheme="purple"
              as="a"
              href="/"
            >
              Go back home
            </Button>
            <Spacer />
            <Link
              size="md"
              fontSize="md"
              fontWeight="semibold"
              textAlign="center"
              color="gray.900"
              href="#"
            >
              Contact support{" "}
              <Box as="span" ms="5px">
                →
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
