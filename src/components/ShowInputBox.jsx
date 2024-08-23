import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MdAttachMoney } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

function ShowInputBox({ getDetails }) {
  const [carat, setCarat] = useState("");
  const [dollar, setDollar] = useState(85);
  const [totalCarat, setTotalCarat] = useState("");
  const [unit, setUnit] = useState("carat");
  const [currency, setCurrency] = useState("inr");
  const [caratError, setCaratError] = useState(false);
  const [totalCaratError, setTotalCaratError] = useState(false);

  const toast = useToast();

  // Function to handle calculation
  const calculate = () => {
    let hasError = false;

    // Validate carat value
    if (!carat) {
      setCaratError(true);
      hasError = true;
    } else {
      setCaratError(false);
    }

    // Validate total carat
    if (!totalCarat) {
      setTotalCaratError(true);
      hasError = true;
    } else {
      setTotalCaratError(false);
    }

    if (hasError) {
      toast({
        position: "top",
        title: "Validation Error",
        description: "Please fill out all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Perform calculation
    // const totalValue = parseFloat(carat) * dollar;
    getDetails(unit, currency, carat, totalCarat, dollar);
    // setTotalCarat(totalValue.toFixed(2));
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <Card>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">
            Amerlads Calculator
          </Text>
        </CardHeader>
        <Divider />
        <CardBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="carat">Unit/Currency Value</FormLabel>
              <Stack spacing={4} direction="row" align="center">
                <Select
                  placeholder="Unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  width="120px"
                >
                  <option value="carat">Carat</option>
                  <option value="gram">Gram</option>
                </Select>
                <Select
                  placeholder="Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  width="120px"
                >
                  <option value="inr">Rupee</option>
                  <option value="dollar">Dollar</option>
                </Select>
              </Stack>
            </FormControl>
            <FormControl isInvalid={caratError}>
              <FormLabel htmlFor="carat">Enter one {unit} price</FormLabel>
              <Input
                id="carat"
                type="number"
                value={carat}
                onChange={(e) => setCarat(e.target.value)}
                placeholder={`Enter 1 ${unit} Price`}
                mt={2}
              />
              {caratError && (
                <FormErrorMessage>Value is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="dollar">Dollar Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<MdAttachMoney />} />
                <Input
                  id="dollar"
                  type="number"
                  value={dollar}
                  onChange={(e) => setDollar(e.target.value)}
                  placeholder="Enter dollar value"
                />
              </InputGroup>
            </FormControl>
            <FormControl isInvalid={totalCaratError}>
              <FormLabel htmlFor="totalCarat">
                Total{" "}
                <span style={{ textTransform: "capitalize" }}>{unit}s</span>
              </FormLabel>
              <Input
                id="totalCarat"
                type="number"
                value={totalCarat}
                onChange={(e) => setTotalCarat(e.target.value)}
                // isReadOnly
                placeholder="Total value"
              />
              {totalCaratError && (
                <FormErrorMessage>Total value is required.</FormErrorMessage>
              )}
            </FormControl>
            <Button colorScheme="blue" onClick={calculate}>
              Calculate
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}
export default ShowInputBox;
