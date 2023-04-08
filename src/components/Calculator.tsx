"use client"; // this is a client component 👈🏽
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { WiDaySunny } from "react-icons/wi";
import { Card, Label, TextInput, Button, Table, Tabs } from "flowbite-react";
import React, { useCallback, useState } from "react";

export const Calculator = () => {
  const [subjectPropertySqft, setSubjectPropertySqft] = useState(0);
  const [recentSoldCostPerSqFoot, setRecentSoldCostPerSqFoot] = useState(0);
  const [adjustmentsSymbol, setAdjustmentsSymbol] = useState("");
  const [adjustments, setAdjustments] = useState(0);
  const [arvBuyPercentage, setArvBuyPercentage] = useState(0);
  const [assignmentFee, setAssignmentFee] = useState(0);

  const [originalArv, setOriginalArv] = useState("");
  const [adjustedARV, setAdjustedARV] = useState("");
  const [floorPrice, setFloorPrice] = useState("");
  const [abbreviatedAdjustmentsNumber, setAbbreviatedAdjustmentsNumber] =
    useState("");
  const [desiredAssignmentFee, setDesiredAssignmentFee] = useState("");
  const [offer, setOffer] = useState("");

  const calculateOffer = useCallback(() => {
    const arvWithoutAdjustments = subjectPropertySqft * recentSoldCostPerSqFoot;
    const arvWithAdjustments =
      adjustmentsSymbol === "-"
        ? arvWithoutAdjustments - adjustments
        : arvWithoutAdjustments + adjustments;
    const floorPrice = Math.floor(arvWithAdjustments * arvBuyPercentage);
    const offer = floorPrice - assignmentFee;

    const generalARV = new Intl.NumberFormat("en-US").format(
      arvWithoutAdjustments
    );
    const adjustedARV = new Intl.NumberFormat("en-US").format(
      arvWithAdjustments
    );
    const floorPriceFormatted = new Intl.NumberFormat("en-US").format(
      floorPrice
    );
    const abbreviatedAdjustmentsNumber = adjustments.toString().slice(0, 2);
    const desiredAssignmentFee = new Intl.NumberFormat("en-US").format(
      assignmentFee
    );
    const offerNumber = new Intl.NumberFormat("en-US").format(offer);

    setOriginalArv(generalARV);
    setAdjustedARV(adjustedARV);
    setFloorPrice(floorPriceFormatted);
    setAbbreviatedAdjustmentsNumber(abbreviatedAdjustmentsNumber);
    setDesiredAssignmentFee(desiredAssignmentFee);
    setOffer(offerNumber);
  }, [
    adjustments,
    adjustmentsSymbol,
    arvBuyPercentage,
    assignmentFee,
    recentSoldCostPerSqFoot,
    subjectPropertySqft,
  ]);

  const handleSymbolChange = (symbol: string) => {
    symbol === "-" ? setAdjustmentsSymbol("-") : setAdjustmentsSymbol("+");
  };

  const inputData = new Map([
    [
      "input1",
      {
        labelName: "Subject Property Sqft",
        placeHolder: "1,250",
        onChange: setSubjectPropertySqft,
      },
    ],
    [
      "input2",
      {
        labelName: "Recent Sold Cost Per SqFoot",
        placeHolder: "$133",
        onChange: setRecentSoldCostPerSqFoot,
      },
    ],
    [
      "input3",
      {
        labelName: "Adjustments",
        placeHolder: `${adjustmentsSymbol}$30,000`,
        onChange: setAdjustments,
      },
    ],
    [
      "input4",
      {
        labelName: "ARV Buy Percentage",
        placeHolder: "0.65",
        onChange: setArvBuyPercentage,
      },
    ],
    [
      "input5",
      {
        labelName: "Assignment Fee",
        placeHolder: "$10,000",
        onChange: setAssignmentFee,
      },
    ],
  ]);

  const tableData = new Map([
    ["generalArv", { labelName: "General ARV", data: `$${originalArv}` }],
    [
      "adjustedArv",
      {
        labelName: `Adjusted ARV ${adjustmentsSymbol}${abbreviatedAdjustmentsNumber}K:`,
        data: `$${adjustedARV}`,
      },
    ],
    [
      "floorPrice",
      {
        labelName: `${
          arvBuyPercentage && Math.floor(arvBuyPercentage * 100)
        }% of ARV:`,
        data: `$${floorPrice}`,
      },
    ],
    [
      "assignmentFee",
      { labelName: "Assignment Fee", data: `$${desiredAssignmentFee}` },
    ],
    ["offer", { labelName: "Offer", data: `$${offer}` }],
  ]);

  return (
    <div>
      <Card className="w-[30rem] my-4">
        {Array.from(inputData).map(([key, value]) => {
          const { labelName, placeHolder, onChange } = value;

          return (
            <div key={key}>
              <Label htmlFor="base" value={labelName} />
              {labelName === "Adjustments" && (
                <div className="flex flex-row gap-2 mb-2">
                  <Button
                    size="xxs"
                    fullSized
                    outline={adjustmentsSymbol === "-" ? false : true}
                    gradientDuoTone="purpleToBlue"
                    onClick={() => handleSymbolChange("-")}
                  >
                    <AiOutlineMinus />
                  </Button>
                  <Button
                    size="xxs"
                    fullSized
                    outline={adjustmentsSymbol === "+" ? false : true}
                    gradientDuoTone="purpleToBlue"
                    onClick={() => handleSymbolChange("+")}
                  >
                    <AiOutlinePlus />
                  </Button>
                </div>
              )}
              <TextInput
                id="base"
                type="number"
                sizing="md"
                placeholder={placeHolder}
                onChange={(e) => onChange(e.target.valueAsNumber)}
              />
            </div>
          );
        })}
        <div className="flex justify-center">
          <Button
            onClick={calculateOffer}
            outline={true}
            gradientDuoTone="purpleToBlue"
          >
            Calculate Offer
          </Button>
        </div>
        <Table>
          <Table.Body className="divide-y">
            {Array.from(tableData).map(([key, value]) => {
              const { labelName, data } = value;
              return (
                <Table.Row
                  key={key}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {labelName}
                  </Table.Cell>
                  <Table.Cell>{data}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
};
