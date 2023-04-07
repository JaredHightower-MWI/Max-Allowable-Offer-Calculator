"use client"; // this is a client component 👈🏽
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

  return (
    <div>
      <label>
        Subject Property Sqft:
        <input
          type="number"
          value={subjectPropertySqft}
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
      <label>
        Adjustments Symbol:
        <select
          value={adjustmentsSymbol}
          onChange={(e) => setAdjustmentsSymbol(e.target.value)}
        >
          <option value="+">+</option>
          <option value="-">-</option>
        </select>
      </label>
      <br />
      <label>
        Adjustments:
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
      <div>
        <p>General ARV: ${originalArv}</p>
        {adjustments != 0 && (
          <p>
            ARV with adjustments {adjustmentsSymbol}
            {abbreviatedAdjustmentsNumber}K: ${adjustedARV}
          </p>
        )}
        <p>
          {Math.floor(arvBuyPercentage * 100)}% of ARV: ${floorPrice}
        </p>
        <p>Assignment Fee: ${desiredAssignmentFee}</p>
        <p>Offer: ${offer}</p>
      </div>
    </div>
  );
};
