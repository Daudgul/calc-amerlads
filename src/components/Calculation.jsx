import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { MdAttachMoney } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

function Calculation({ getBack, items }) {
  function numberToWords(number) {
    const ones = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const thousands = ["", "Thousand", "Lakh", "Crore"];

    if (number === 0) return "Zero";

    const getWords = (n) => {
      if (n < 20) return ones[n];
      if (n < 100)
        return (
          tens[Math.floor(n / 10) - 2] +
          (n % 10 !== 0 ? " " + ones[n % 10] : "")
        );
      if (n < 1000)
        return (
          ones[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 !== 0 ? " and " + getWords(n % 100) : "")
        );
      if (n < 100000)
        return (
          getWords(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 !== 0 ? " " + getWords(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          getWords(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 !== 0 ? " " + getWords(n % 100000) : "")
        );
      return (
        getWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 !== 0 ? " " + getWords(n % 10000000) : "")
      );
    };

    return getWords(number).trim();
  }

  return (
    <Box p={4} maxW="md" mx="auto">
      <Button my={5} onClick={getBack}>
        Back
      </Button>
      {/* First Card */}
      <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
        <Text mb={2}>
          <strong>Input Value : </strong>
          <span>
            {items.pricePerUnit}
            {items.currency === "inr" ? " ₹" : " $"}
          </span>
        </Text>
        <Text mb={2} textTransform={"capitalize"}>
          <strong>Total Units :</strong> {items.totalUnits} {items.unit}s
        </Text>
      </Box>

      {/* Second Card */}
      <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
        <Text mb={2}>
          <strong>Total Grams:</strong> {items.totalGrams}
        </Text>
        <Text mb={2}>
          <strong>Total Carats:</strong> {items.totalCarats}
        </Text>
      </Box>

      {/* Third Card */}
      <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
        <Text mb={2}>
          <strong>1 Carat Price (INR) :</strong> {items.oneCaratInInr} ₹
        </Text>
        <Text mb={2}>
          <strong>1 Gram Price (INR) :</strong> {items.oneGramInInr} ₹
        </Text>
        <Text mb={2}>
          <strong>Total Price (INR) :</strong> {items.totalCaratInInr} ₹
        </Text>
        <Text color={"red"} mb={2}>
          {" "}
          {numberToWords(Math.floor(items.totalCaratInInr))} ₹
        </Text>
      </Box>

      {/* Fourth Card */}
      <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
        <Text mb={2}>
          <strong>1 Carat Price (Dollar) :</strong> {items.oneCaratInDollar} $
        </Text>
        <Text mb={2}>
          <strong>1 Gram Price (Dollar) :</strong> {items.oneGramInDollar} $
        </Text>
        <Text mb={2}>
          <strong>Total Price (Dollar) :</strong> {items.totalCaratInDollar} $
        </Text>
        <Text color={"red"} mb={2}>
          {numberToWords(Math.floor(items.totalCaratInDollar))} $
        </Text>
      </Box>
    </Box>
  );
}

export default Calculation;

function Chip({ value }) {
  return (
    <>
      <Box
        backgroundColor={"white"}
        border={"solid black 1px "}
        borderRadius={"5px"}
        display={"inline"}
        p={1}
        // mb={"-20px"}
      >
        <strong style={{ color: "red" }}>{value}</strong>
      </Box>
    </>
  );
}
