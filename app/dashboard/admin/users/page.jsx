"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  // Button,
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalCloseButton,
  // ModalBody,
  // ModalFooter,
  // useToast,
  // HStack,
  // VStack,
  // FormControl,
  // FormLabel,
  // Input,
} from "@chakra-ui/react";
import AddAcount from "../../../components/createUsers/Create";

const TableData = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <>
      <AddAcount />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Users ID</Th>
            <Th>Email</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        {Array.isArray(users) &&
          users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
            </Tr>
          ))}
      </Table>
    </>
  );
};

export default TableData;
