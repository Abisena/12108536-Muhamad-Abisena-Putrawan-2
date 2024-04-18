"use client";

// import {
//   FormLabel,
//   FormControl,
//   Input,
//   Button,
//   VStack,
//   Box,
//   useToast,
//   HStack,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { axiosFetcher } from "@/app/lib/axiosIntance";
// const AddProduct = () => {
//   const [nama_produk, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const toast = useToast();

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axiosFetcher.post("/api/product", {
//         nama_produk,
//         price,
//         quantity,
//       });
//       console.log(response.data);

//       if (response) {
//         toast({
//           title: "Product added successfully",
//           description: "The product has been added to the inventory",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });

//         setName("");
//         setPrice("");
//         setQuantity("");
//       } else {
//         toast({
//           title: "Product addition failed",
//           description: "An error occurred while adding the product",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });

//         setName("");
//         setPrice("");
//         setQuantity("");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Box p={4}>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <VStack spacing={4}>
//           <FormControl>
//             <FormLabel>Product Name</FormLabel>
//             <Input
//               type="text"
//               placeholder="Enter product name"
//               value={nama_produk}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Product Price</FormLabel>
//             <Input
//               type="text"
//               placeholder="Enter product name"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Quantity</FormLabel>
//             <Input
//               type="number"
//               placeholder="Enter product price"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//             />
//           </FormControl>
//           <HStack>
//             <Button
//               type="submit"
//               colorScheme="blue"
//               onClick={handleSubmit}
//               isLoading={isLoading}
//             >
//               Add Product
//             </Button>
//           </HStack>
//         </VStack>
//       </form>
//     </Box>
//   );
// };

// export default AddProduct;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import ExportProductToExcel from "../../../components/buttonExcelProduct/Excel";
import AddProductModal from "../../../components/modalProduct/modalProduk";

const Product = () => {
  const [products, setProducts] = useState([]);

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

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/product/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <ExportProductToExcel />
      <AddProductModal />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.nama_produk}</Td>
              <Td>{product.price}</Td>
              <Td>{product.quantity}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default Product;
