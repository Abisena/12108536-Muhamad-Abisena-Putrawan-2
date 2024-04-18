import React from "react";
import { Button } from "@chakra-ui/react";

const PrintPDFButton = () => {
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <Button onClick={handlePrintPDF} colorScheme="teal">
      Print PDF
    </Button>
  );
};

export default PrintPDFButton;
