"use client"; // this is a client component 👈🏽
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsPlusSlashMinus } from "react-icons/bs";

import { Label, TextInput, Dropdown } from "flowbite-react";
import React, { useCallback, useState } from "react";

export const Calculator = () => {
  const [subjectPropertySqft, setSubjectPropertySqft] = useState(0);
  const [recentSoldCostPerSqFoot, setRecentSoldCostPerSqFoot] = useState(0);
  const [adjustmentsSymbol, setAdjustmentsSymbol] = useState("-");
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
    const plusOrMinusSymbol = adjustmentsSymbol.includes("-") ? "-" : "+";

    setOriginalArv(generalARV);
    setAdjustedARV(adjustedARV);
    setFloorPrice(floorPriceFormatted);
    setAbbreviatedAdjustmentsNumber(abbreviatedAdjustmentsNumber);
    setDesiredAssignmentFee(desiredAssignmentFee);
    setOffer(offerNumber);

    console.log(`General ARV: $${generalARV}`);
    console.log(
      `ARV with adjustments ${plusOrMinusSymbol}${abbreviatedAdjustmentsNumber}K: $${adjustedARV}`
    );
    console.log(
      `${Math.floor(arvBuyPercentage * 100)}% of ARV: $${floorPriceFormatted}`
    );
    console.log(`Assignment Fee: $${desiredAssignmentFee}`);
    console.log(`Offer: $${offerNumber}`);
  }, [
    adjustments,
    adjustmentsSymbol,
    arvBuyPercentage,
    assignmentFee,
    recentSoldCostPerSqFoot,
    subjectPropertySqft,
  ]);

  const handleAdjustmentDisplay = adjustments != 0 && (
    <td>
      ARV with adjustments {adjustmentsSymbol}
      {abbreviatedAdjustmentsNumber}K: ${adjustedARV}
    </td>
  );

  // const InputBox = ({ placeHolder, setState }) => {
  //   return (
  //     <div>
  //       <div className="mb-2 block">
  //         <Label htmlFor="base" value="Base input" />
  //       </div>
  //       <TextInput
  //         id="base"
  //         type="number"
  //         sizing="md"
  //         onChange={(e) => setState(e.target.valueAsNumber)}
  //       />
  //     </div>
  //   );
  // };

  const PlusOrMinusButton = () => (
    <div className="mx-2">
      <Dropdown label={<BsPlusSlashMinus />}>
        <Dropdown.Item icon={AiOutlineMinus} value="-">
          Adjustments
        </Dropdown.Item>
        <Dropdown.Item icon={AiOutlinePlus} value="+">
          Adjustments
        </Dropdown.Item>
      </Dropdown>
    </div>
  );

  return (
    <div>
      <label>
        Subject Property Sqft
        <input
          type="number"
          placeholder="1,250"
          onChange={(e) => setSubjectPropertySqft(e.target.valueAsNumber)}
        />
      </label>
      <br />
      <label>
        Recent Sold Cost Per SqFoot:
        <input
          type="number"
          value={recentSoldCostPerSqFoot}
          onChange={(e) => setRecentSoldCostPerSqFoot(e.target.valueAsNumber)}
        />
      </label>
      <br />
      {/* <label>
        <select
          value={adjustmentsSymbol}
          onChange={(e) => setAdjustmentsSymbol(e.target.value)}
        >
          <option value="+">+</option>
          <option value="-">-</option>
        </select>
      </label> */}
      <br />
      <label className="flex row">
        Adjustments:
        <PlusOrMinusButton />
        <input
          type="number"
          value={adjustments}
          onChange={(e) => setAdjustments(e.target.valueAsNumber)}
        />
      </label>
      <br />
      <label>
        ARV Buy Percentage:
        <input
          type="number"
          value={arvBuyPercentage}
          onChange={(e) => setArvBuyPercentage(e.target.valueAsNumber)}
        />
      </label>
      <br />
      <label>
        Assignment Fee:
        <input
          type="number"
          value={assignmentFee}
          onChange={(e) => setAssignmentFee(e.target.valueAsNumber)}
        />
      </label>
      <br />
      <button onClick={calculateOffer}>Calculate Offer</button>

      <table className="table-fixed">
        <tbody>
          <tr>
            <td>General ARV: ${originalArv}</td>
          </tr>
          <tr>{handleAdjustmentDisplay}</tr>
          <tr>
            <td>
              {Math.floor(arvBuyPercentage * 100)}% of ARV: ${floorPrice}
            </td>
          </tr>
          <tr>
            <td>Assignment Fee: ${desiredAssignmentFee}</td>
          </tr>
          <tr>
            <td>
              <strong className="text-orange-600">Offer:</strong> ${offer}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
