import React from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Button } from "@chakra-ui/react";

const ExportProductToExcel = () => {
  const exportToExcel = async () => {
    try {
      const response = await axios.get("/api/product");
      const data = response.data;

      const excelData = data.map((product) => ({
        id: product.id,
        nama_produk: product.nama_produk,
        price: product.price,
        quantity: product.quantity,
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelBlob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const excelUrl = URL.createObjectURL(excelBlob);

      const link = document.createElement("a");
      link.href = excelUrl;
      link.download = "products.xlsx";
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

export default ExportProductToExcel;
