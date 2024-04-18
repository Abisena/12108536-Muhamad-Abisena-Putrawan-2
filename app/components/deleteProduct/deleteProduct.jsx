// "use client";

// import { useState } from "react";
// import axios from "axios";
// import {
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   DrawerHeader,
//   DrawerBody,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   FormErrorMessage,
//   useDisclosure,
//   useToast,
// } from "@chakra-ui/react";

// export default function DeleteUsers() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const toast = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [id, setId] = useState("");
//   const [idError, setIdError] = useState("");

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     setIdError("");

//     if (!id) {
//       setIdError("ID is required");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.delete(`/api/users/${id}`);

//       if (response.ok) {
//         toast({
//           title: "Success",
//           description: "User deleted successfully",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//         onClose();
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to delete user",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       toast({
//         title: "Error",
//         description: "Failed to delete user",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Button onClick={onOpen} colorScheme="red">
//         Delete Users
//       </Button>
//       <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>Delete Users</DrawerHeader>
//           <DrawerBody>
//             <form onSubmit={onSubmit}>
//               <FormControl isInvalid={!!idError}>
//                 <FormLabel htmlFor="id">ID</FormLabel>
//                 <Input
//                   id="id"
//                   name="id"
//                   type="number"
//                   placeholder="ID"
//                   value={id}
//                   onChange={(e) => setId(e.target.value)}
//                 />
//                 <FormErrorMessage>{idError}</FormErrorMessage>
//               </FormControl>

//               <Button
//                 mt={4}
//                 colorScheme="red"
//                 isLoading={isLoading}
//                 type="submit"
//               >
//                 Delete
//               </Button>
//             </form>
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// }

import { useState } from "react";
import axios from "axios";
import { Button, useToast } from "@chakra-ui/react";

export default function DeleteProduct({ id }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  console.log(id);

  const onDelete = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(`/api/product/${id}`);

      if (response) {
        toast({
          title: "Success",
          description: "User deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete user",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button colorScheme="red" isLoading={isLoading} onClick={onDelete}>
      Delete Product
    </Button>
  );
}
