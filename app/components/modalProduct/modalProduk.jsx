"use client";

import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { axiosFetcher } from "@/app/lib/axiosIntance";

const AddProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nama_produk, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axiosFetcher.post("/api/product", {
        nama_produk,
        price,
        quantity,
      });
      console.log(response.data);

      if (response) {
        toast({
          title: "Product added successfully",
          description: "The product has been added to the inventory",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setName("");
        setPrice("");
        setQuantity("");
        setIsOpen(false);
      } else {
        toast({
          title: "Product addition failed",
          description: "An error occurred while adding the product",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        setName("");
        setPrice("");
        setQuantity("");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} colorScheme="green">
        Add Product
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter product name"
                value={nama_produk}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Product Price</FormLabel>
              <Input
                type="text"
                placeholder="Enter product name"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                placeholder="Enter product price"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Add Product
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProductModal;
