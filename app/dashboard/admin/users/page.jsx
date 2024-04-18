"use client";

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
  Input,
} from "@chakra-ui/react";

const TableData = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
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

  const handleDeleteUser = async (userId) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/users/${userId}`);
      toast({
        title: "User deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error deleting user",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/users`, {
        id: selectedUser.id,
        email,
        password,
      });
      console.log(response.data);
      toast({
        title: "User updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error updating user",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetail = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
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
        {Array.isArray(users) &&
          users.map((user) => (
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
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleViewDetail(user)}
                  >
                    Update
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
          <ModalHeader>User Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser && (
              <VStack spacing={4} width="100%" maxW="md" mx="auto">
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    value={selectedUser.email}
                    isReadOnly={!selectedUser}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="role">
                  <FormLabel>Role</FormLabel>
                  <Input
                    type="text"
                    value={selectedUser.role}
                    isReadOnly={!selectedUser}
                  />
                </FormControl>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>Close</Button>
            <Button
              colorScheme="blue"
              onClick={handleUpdateUser}
              isLoading={isLoading}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableData;
