import { useState } from "react";
import {
  Input,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

const AddAcount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleAddAccount = async () => {
    try {
      const response = await axios.post("/api/users", { email, password });
      console.log(response.data);
      toast({
        title: "Account added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding account:", error);
      toast({
        title: "Error adding account",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme="blue" onClick={() => setIsOpen(true)}>
        Add Account
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddAccount}>
              Save
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAcount;
