import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import image from "./assets/back-img.jpg";
import Calculation from "./components/Calculation";
import ShowInputBox from "./components/ShowInputBox";

function App() {
  const [items, setItems] = useState({});
  const [showInput, setShowInput] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function getDetails(unit, currency, perValue, totalVlaue, dollar) {
    calculateValues(unit, currency, dollar, perValue, totalVlaue);
    setShowInput(false);
  }
  function calculateValues(
    unit,
    currency,
    dollarToInrRate,
    pricePerUnit,
    totalUnits
  ) {
    if (
      !["carat", "gram"].includes(unit) ||
      !["inr", "dollar"].includes(currency)
    ) {
      throw new Error("Invalid unit or currency");
    }

    // Initialize results
    let oneCaratInInr, oneCaratInDollar;
    let oneGramInInr, oneGramInDollar;
    let totalCarats, totalGrams;
    let totalCaratInInr, totalCaratInDollar;
    let totalGramInInr, totalGramInDollar;

    // Determine the base prices
    if (currency === "dollar") {
      // Price per unit is in USD
      if (unit === "carat") {
        oneCaratInDollar = pricePerUnit; // 6
        oneCaratInInr = pricePerUnit * dollarToInrRate; // 6 * 85 = 510
        totalCarats = totalUnits; // 10
        totalCaratInDollar = totalUnits * oneCaratInDollar; // 6 * 10 = 600
        totalCaratInInr = totalUnits * oneCaratInInr; // 510 * 10 = 5100
        oneGramInDollar = oneCaratInDollar * 5; // 6 * 5 = 30
        oneGramInInr = oneGramInDollar * dollarToInrRate; // 30 * 85 = 2550
        totalGrams = totalCarats / 5; // 10 / 5 = 2
        totalGramInDollar = totalGrams * oneGramInDollar; // 2 * 30 = 60
        totalGramInInr = totalGrams * oneGramInInr; // 2 * 2550 = 5100
      } else if (unit === "gram") {
        oneGramInDollar = pricePerUnit; // 30
        oneGramInInr = pricePerUnit * dollarToInrRate; // 30 * 85 = 2550
        totalGrams = totalUnits; // 2
        totalGramInDollar = totalUnits * oneGramInDollar; // 2 * 30 = 60
        totalGramInInr = totalUnits * oneGramInInr; // 2 * 2550 = 5100
        oneCaratInDollar = oneGramInDollar / 5; //       // 30 / 5 = 6
        oneCaratInInr = oneCaratInDollar * dollarToInrRate; // 6 * 85 = 510
        totalCarats = totalGrams * 5; ////////////////////// 2 * 5 = 10
        totalCaratInDollar = totalCarats * oneCaratInDollar; // 10 * 6 = 60
        totalCaratInInr = totalCarats * oneCaratInInr; //   // 10 * 510 = 5100
      }
    } else if (currency === "inr") {
      // Price per unit is in INR
      if (unit === "carat") {
        oneCaratInInr = pricePerUnit; ///////////////////// // 500
        oneCaratInDollar = pricePerUnit / dollarToInrRate; // 500 / 85 = 5.882
        totalCarats = totalUnits; //////////////////////////// 10
        totalCaratInInr = totalUnits * oneCaratInInr; ////// // 500 * 10 =  5000
        totalCaratInDollar = totalUnits * oneCaratInDollar; // 5.88 * 10 = 58.88
        oneGramInInr = oneCaratInInr * 5; /////////////////// 500 * 5 = 2500
        oneGramInDollar = oneGramInInr / dollarToInrRate; //  2500 / 85 = 29.47
        totalGrams = totalCarats / 5; // //////////////////// 10 / 5  = 2
        totalGramInInr = totalGrams * oneGramInInr; // ////// 2 * 2500 = 5000
        totalGramInDollar = totalGrams * oneGramInDollar; /// 2 * 29.47 = 58.82
      } else if (unit === "gram") {
        oneGramInInr = pricePerUnit; // 2500
        oneGramInDollar = pricePerUnit / dollarToInrRate; // 2500 / 85 = 29.47
        totalGrams = totalUnits; //2
        totalGramInInr = totalUnits * oneGramInInr; // 2 * 2500 = 5000
        totalGramInDollar = totalUnits * oneGramInDollar; // 29.47 * 2 = 58.94
        oneCaratInInr = oneGramInInr / 5; // 2500 / 5 = 500
        oneCaratInDollar = oneCaratInInr / dollarToInrRate; // 500 / 85 = 5.882
        totalCarats = totalGrams * 5; // 2 *5 = 10
        totalCaratInInr = totalCarats * oneCaratInInr; // 10 * 500 = 5000
        totalCaratInDollar = totalCarats * oneCaratInDollar; // 10 * 5.882 = 58.82
      }
    }

    const values = {
      oneCaratInInr: Number(oneCaratInInr),
      oneCaratInDollar: Number(oneCaratInDollar),
      oneGramInInr: Number(oneGramInInr),
      oneGramInDollar: Number(oneGramInDollar),
      totalCarats: Number(totalCarats),
      totalGrams: Number(totalGrams),
      totalCaratInInr: Number(totalCaratInInr),
      totalCaratInDollar: Number(totalCaratInDollar),
      totalGramInInr: Number(totalGramInInr),
      totalGramInDollar: Number(totalGramInDollar),
      dollarToInrRate: Number(dollarToInrRate),
      pricePerUnit: Number(pricePerUnit),
      totalUnits: Number(totalUnits),
      currency,
      unit,
    };
    setItems(values);

    return values;
  }
  function getBack() {
    setShowInput(true);
  }

  return (
    <>
      <Box
        mx={"auto"}
        maxW={"450px"}
        minW={"390px"}
        position={"relative"}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        height={"100vh"}
        backgroundImage={image}
        backgroundPosition={"51% 50%"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"130vh"}
      >
        {/* {showInput && (
          <Box width={"80%"} position={"absolute"} top={"7%"}>
            <Button onClick={onOpen}>History</Button>
          </Box>
        )} */}
        <Box width={"90%"} backgroundColor={"white"}>
          {!showInput ? (
            <Calculation getBack={getBack} items={items} />
          ) : (
            <ShowInputBox getDetails={getDetails} />
          )}
        </Box>
        <Box>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW={"350px"}>
              <ModalHeader>Saved Calculation</ModalHeader>
              <ModalCloseButton />
              <ModalBody>no items found</ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>{" "}
        </Box>
      </Box>
    </>
  );
}

export default App;
