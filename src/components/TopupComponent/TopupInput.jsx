"use client";

import React from "react";
import { Button, InputText } from "../common";
import { MdOutlineMoney } from "react-icons/md";

const TopupInput = ({ amount, setAmount, setModalOpen }) => {
  const suggestions = [
    { label: "Rp10.000", value: 10000 },
    { label: "Rp20.000", value: 20000 },
    { label: "Rp50.000", value: 50000 },
    { label: "Rp100.000", value: 100000 },
    { label: "Rp250.000", value: 250000 },
    { label: "Rp500.000", value: 500000 },
  ];

  const formatAmount = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setAmount(rawValue);
  };

  const handleSuggestionClick = (value) => {
    setAmount(value.toString());
  };

  const isAmountValid = () => {
    const numericAmount = Number(amount);
    return numericAmount >= 10000 && numericAmount <= 1000000;
  };
  return (
    <div className="flex gap-5 w-full">
      <div className="flex flex-col gap-5 flex-[6]">
        <InputText
          leftComponent={
            <MdOutlineMoney size={24} color={!amount ? "gray" : "black"} />
          }
          placeholder="Masukan Nominal Top Up"
          type="text"
          value={formatAmount(amount)}
          onChange={handleAmountChange}
        />

        <Button
          disabled={!amount || !isAmountValid()}
          onClick={() => setModalOpen(true)}
          className="w-full bg-red-500 py-2 rounded-sm text-white font-semibold hover:bg-red-600 transition-all"
        >
          Top Up
        </Button>
      </div>

      <div className="flex-[4]">
        <div className="grid grid-cols-3 w-[80%] h-full gap-3 gap-x-2">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(item.value)}
              className="px-4 py-2 border rounded-md items-center justify-center w-[110px] h-fit cursor-pointer hover:bg-gray-50"
            >
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopupInput;
