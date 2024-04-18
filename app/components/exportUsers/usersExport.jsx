import React from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Button } from "@chakra-ui/react";

const ExportUsersToExcel = () => {
  const exportToExcel = async () => {
    try {
      const response = await axios.get("/api/users");
      const data = response.data;

      const excelData = data.map((users) => ({
        user_id: users.id,
        email: users.email,
        password: users.password,
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

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
      link.download = "Users.xlsx";
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

export default ExportUsersToExcel;
