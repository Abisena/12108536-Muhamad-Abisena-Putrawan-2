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
        pembayaran: customer.pembayaran,
        sales: customer.sales.map((sale) => ({
          id: sale.id,
          productId: sale.productId,
          pelangganId: sale.pelangganId,
          quantity: sale.quantity,
          total: sale.total,
        })),
      }));

      const wb = XLSX.utils.book_new();
      excelData.forEach((customer) => {
        const salesSheet = XLSX.utils.json_to_sheet(customer.sales);
        XLSX.utils.book_append_sheet(
          wb,
          salesSheet,
          `Sales Data - ${customer.nama_pelanggan}`
        );
      });

      const customersSheet = XLSX.utils.json_to_sheet(excelData);
      XLSX.utils.book_append_sheet(wb, customersSheet, "Customers Data");

      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
      const blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "customer_data.xlsx";
      link.click();
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <Button onClick={exportToExcel} colorScheme="blue" m={10}>
         Export to Excel   
    </Button>
  );
};

export default ExportToExcelButton;
