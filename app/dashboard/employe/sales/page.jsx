"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const CreateOrderForm = () => {
  const [formData, setFormData] = useState({
    nama_pelanggan: "",
    alamat_pelanggan: "",
    no_telpon: 0,
    productId: 0,
    quantity: parseInt(0),
    pembayaran: parseInt(0),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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

      setFormData({
        nama_pelanggan: "",
        alamat_pelanggan: "",
        no_telpon: 0,
        productId: 0,
        quantity: parseInt(0),
        pembayaran: parseInt(0),
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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleModalOpen} colorScheme="blue" mb={4}>
        Add New Order
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
              <FormLabel>Product</FormLabel>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.nama_produk}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pembayaran</FormLabel>
              <Input
                type="number"
                name="pembayaran"
                value={formData.pembayaran}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleSubmit}
              isLoading={isLoading}
              colorScheme="blue"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nama Product</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.nama_produk}</Td>
              <Td>{product.price}</Td>
              <Td>{product.quantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default CreateOrderForm;
