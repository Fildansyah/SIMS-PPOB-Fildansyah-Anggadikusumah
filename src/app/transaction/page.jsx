"use client";
import {
  BalanceSection,
  Navbar,
  ProfileSection,
  TransactionCard,
} from "@/components";
import { useTransactionHistoryQuery } from "@/services/transaction/transactionApi";
import React, { useState, useEffect } from "react";

export default function Transaction() {
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const { data, isLoading, isError } = useTransactionHistoryQuery({
    limit,
    offset,
  });

  useEffect(() => {
    if (data?.data?.records) {
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        ...data.data.records,
      ]);
    }
  }, [data]);

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div className="h-screen flex flex-col w-full overflow-hidden">
      <Navbar />
      <div className="flex flex-col w-full px-52 py-10 gap-10 overflow-hidden">
        <div className="flex flex-row gap-5">
          <ProfileSection />
          <BalanceSection />
        </div>

        <div className="flex flex-col gap-5 overflow-hidden ">
          <p className="font-semibold text-lg">Semua Transaksi</p>

          {isLoading && offset === 0 ? (
            <div className="flex flex-col gap-5">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex flex-col gap-3 animate-pulse">
                  <div className="w-full h-8 bg-gray-200 rounded-md" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center">
              <p>Failed to load transactions. Please try again later.</p>
            </div>
          ) : !isLoading && data?.data?.records.length === 0 ? (
            <div className="flex justify-center items-center text-gray-400">
              <p>Maaf tidak ada transaksi saat ini</p>
            </div>
          ) : (
            <div className="flex flex-col w-full gap-5 overflow-y-auto">
              {transactions.map((transaction, index) => (
                <TransactionCard
                  key={index}
                  amount={transaction.total_amount}
                  date={transaction.created_on}
                  description={transaction.description}
                  isPayment={transaction.transaction_type === "PAYMENT"}
                />
              ))}
            </div>
          )}

          {!isLoading && !isError && data?.data?.records.length > 5 && (
            <p
              className="font-semibold text-red-500 hover:text-red-600 text-lg text-center cursor-pointer"
              onClick={handleShowMore}
            >
              Show more
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
