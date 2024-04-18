"use client";

import React from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Button } from "@chakra-ui/react";

const ExportToExcelButton = () => {
  const exportToExcel = async () => {
    try {
      const response = await axios.get("/api/detail");
      const data = response.data;

      const excelData = data.map((customer) => ({
        id: customer.id,
        nama_pelanggan: customer.nama_pelanggan,
        alamat_pelanggan: customer.alamat_pelanggan,
        no_telpon: customer.no_telpon,
        created_at: customer.created_at,
        updated_at: customer.updated_at,
        sales: customer.sales.map((sale) => ({
          id: sale.id,
          productId: sale.productId,
          pelangganId: sale.pelangganId,
          quantity: sale.quantity,
          total: sale.total,
          status: sale.status,
          createdAt: sale.createdAt,
          updatedAt: sale.updatedAt,
        })),
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);
      XLSX.utils.book_append_sheet(wb, ws, "Customers Data");
      XLSX.writeFile(wb, "customer_data.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <Button onClick={exportToExcel} colorScheme="blue">
      Export to Excel
    </Button>
  );
};

export default ExportToExcelButton;
