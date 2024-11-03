import moment from "moment";
import React from "react";

const TransactionCard = ({ isPayment, amount, date, description }) => {
  return (
    <div className="px-4 py-3 bg-white rounded-lg w-full border flex justify-between cursor-default">
      <div className="flex flex-col">
        <p
          className={`font-semibold ${
            isPayment ? "text-red-500" : "text-green-500"
          }`}
        >
          <span>{isPayment ? "-" : "+"}</span> Rp.{" "}
          {parseInt(amount).toLocaleString("id-ID")}
        </p>
        <p className="text-xs text-gray-400">
          {moment(date).format("DD MMMM YYYY HH:mm")} WIB
        </p>
      </div>

      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
};

export default TransactionCard;
