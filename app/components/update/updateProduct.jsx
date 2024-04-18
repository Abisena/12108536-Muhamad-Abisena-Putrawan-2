"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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

export default function UpdateProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/product`, {
        id: data.id,
        nama_produk: data.nama_produk,
        price: parseInt(data.price),
        quantity: parseInt(data.quantity),
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
      <Button onClick={onOpen}>Open Update Product</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update Product</DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.id}>
                <FormLabel htmlFor="id">ID</FormLabel>
                <Input
                  id="id"
                  name="id"
                  type="number"
                  placeholder="ID"
                  {...register("id", { required: "ID is required" })}
                />
                <FormErrorMessage>
                  {errors.id && errors.id.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.nama_produk}>
                <FormLabel htmlFor="nama_produk">Nama Produk</FormLabel>
                <Input
                  id="nama_produk"
                  name="nama_produk"
                  type="text"
                  placeholder="Nama Produk"
                  {...register("nama_produk", {
                    required: "Nama Produk is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.nama_produk && errors.nama_produk.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.price}>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  {...register("price", { required: "Price is required" })}
                />
                <FormErrorMessage>
                  {errors.price && errors.price.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.quantity}>
                <FormLabel htmlFor="quantity">Quantity</FormLabel>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.quantity && errors.quantity.message}
                </FormErrorMessage>
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
