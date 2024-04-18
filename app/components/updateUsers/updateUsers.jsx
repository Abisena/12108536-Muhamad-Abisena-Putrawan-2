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

export default function UpdateUsers() {
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
      const response = await axios.put(`/api/users`, {
        id: parseInt(data.id),
        email: data.email,
        password: data.password,
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
      <Button onClick={onOpen} colorScheme="orange" m={2}>
        Update Users
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update Users</DrawerHeader>
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

              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="id">Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: "ID is required" })}
                />
                <FormErrorMessage>
                  {errors.id && errors.id.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password">Passowrd</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="text"
                  placeholder="password"
                  {...register("password", {
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
