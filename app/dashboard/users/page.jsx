"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  HStack,
  VStack, 
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";

const TableData = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const HandleTambah = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users", {
        email,
        password
      });
      console.log(response.data);
      toast({
        title: "Product added successfully",
        description: "You can buy the product",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setEmail("");
      setPassword("")
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error);

    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Users ID</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        {Array.isArray(users) && users.map((user) => (
          <Tr key={user.id}>
            <Td>{user.id}</Td>
            <Td>{user.email}</Td>
            <Td>{user.role}</Td>
            <Td>
              <HStack spacing={2}>
                <Button onClick={() => handleViewDetail(user)}>
                  View Detail
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeletePelanggan(user.id)}
                >
                  Delete
                </Button>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Table>

      <Button colorScheme="blue" onClick={openModal}>
        Add Account
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} width="100%" maxW="md" mx="auto">
              <FormControl id="Email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
              </FormControl>
              <FormControl id="price">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={HandleTambah}
              isLoading={isLoading}
            >
              Add Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableData;