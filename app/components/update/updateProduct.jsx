"use client";

import { useState } from "react";
import axios from "axios";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

export default function UpdateProduct({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState("");
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/product/${id}`, {
        quantity: parseInt(quantity),
      });

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Data updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } else {
        toast({
          title: "Error",
          description: "Failed to update data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast({
        title: "Error",
        description: "Failed to update data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen} mx={5} colorScheme="orange">
        Update Product
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update Product</DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="quantity">Quantity</FormLabel>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isLoading}
                type="submit"
              >
                Update
              </Button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
