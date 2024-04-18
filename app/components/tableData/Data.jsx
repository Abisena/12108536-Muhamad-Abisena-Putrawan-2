import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
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
  Container,
  HStack,
} from "@chakra-ui/react";
import ExportToExcelButton from "../button/ButtonExcel";
import PrintPDFButton from "../pdfExport/pdfExport";
// import DeleteUsers from "../deleteUser/deleteUser";

const TableData = () => {
  const [dataPelanggan, setPelangganData] = useState([]);
  const [selectedPelanggan, setSelectedPelanggan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/detail");
        // const data = await response.json();
        setPelangganData(response.data);
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
      const response = await axios.get("/api/detail");
      setPelangganData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewDetail = (pelanggan) => {
    setSelectedPelanggan(pelanggan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPelanggan(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <ExportToExcelButton />

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Pelanggan ID</Th>
            <Th>Nama Pelanggan</Th>
            <Th>Alamat Pelanggan</Th>
            <Th>No. Telpon</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        {Array.isArray(dataPelanggan) &&
          dataPelanggan.map((pelanggan) => (
            <Tr key={pelanggan.id}>
              <Td>{pelanggan.id}</Td>
              <Td>{pelanggan.nama_pelanggan}</Td>
              <Td>{pelanggan.alamat_pelanggan}</Td>
              <Td>{pelanggan.no_telpon}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button onClick={() => handleViewDetail(pelanggan)}>
                    View Detail
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
      </Table>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pelanggan & Order Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPelanggan && (
              <>
                <p>Pelanggan ID: {selectedPelanggan.id}</p>
                <p>Nama Pelanggan: {selectedPelanggan.nama_pelanggan}</p>
                <p>Alamat Pelanggan: {selectedPelanggan.alamat_pelanggan}</p>
                <p>No. Telpon: {selectedPelanggan.no_telpon}</p>
                <p>Pembayaran: {selectedPelanggan.pembayaran}</p>
                <p>Order:</p>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Order ID</Th>
                      <Th>Product ID</Th>
                      <Th>Quantity</Th>
                      <Th>Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedPelanggan.sales.map((order) => (
                      <Tr key={order.id}>
                        <Td>{order.id}</Td>
                        <Td>{order.productId}</Td>
                        <Td>{order.quantity}</Td>
                        <Td>{order.total}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <PrintPDFButton />
                </Table>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableData;
