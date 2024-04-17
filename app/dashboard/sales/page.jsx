"use client";

import { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

const CreateOrderForm = () => {
  const [formData, setFormData] = useState({
    nama_pelanggan: "",
    alamat_pelanggan: "",
    no_telpon: 0,
    productId: 0,
    quantity: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "no_telpon" || name === "productId"
          ? parseInt(value) || ""
          : value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/sales", formData);
      console.log("Order created:", response.data);
      toast({
        title: "Order Created",
        description: "Your order has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description: "Failed to create order. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <FormControl>
        <FormLabel>Nama Pelanggan</FormLabel>
        <Input
          type="text"
          name="nama_pelanggan"
          value={formData.nama_pelanggan}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Alamat Pelanggan</FormLabel>
        <Input
          type="text"
          name="alamat_pelanggan"
          value={formData.alamat_pelanggan}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>No. Telpon</FormLabel>
        <Input
          type="number"
          name="no_telpon"
          value={formData.no_telpon}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Product ID</FormLabel>
        <Input
          type="number"
          name="productId"
          value={formData.productId}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Quantity</FormLabel>
        <Input
          type= "number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </FormControl>
      <Button onClick={handleSubmit} isLoading={isLoading} colorScheme="blue">
        Submit
      </Button>
    </form>
  );
};

export default CreateOrderForm;