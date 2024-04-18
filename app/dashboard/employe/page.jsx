"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const TableData = () => {
  const [dataPelanggan, setPelangganData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/detail");
        setPelangganData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Pelanggan ID</Th>
          <Th>Nama Pelanggan</Th>
          <Th>Alamat Pelanggan</Th>
          <Th>No. Telpon</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Array.isArray(dataPelanggan) &&
          dataPelanggan.map((pelanggan) => (
            <Tr key={pelanggan.id}>
              <Td>{pelanggan.id}</Td>
              <Td>{pelanggan.nama_pelanggan}</Td>
              <Td>{pelanggan.alamat_pelanggan}</Td>
              <Td>{pelanggan.no_telpon}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

export default TableData;
