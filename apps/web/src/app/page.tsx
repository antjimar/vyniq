"use client";
import TransactionItem from "@/components/TransactionItem";
import { useState } from "react";

export default function Home() {
  console.log("Home ejecutándose")

  return (
    <>
      <TransactionItem transaction={{
        id: 1,
        amount: 250.50,
        description: "Supermercado semanal",
        date: "2024-01-15",
        type: "expense",
        category: "Alimentación"
      }} />
      <TransactionItem transaction={{
        id: 2,
        amount: 300.00,
        description: "Salario Enero",
        date: "2024-01-01",
        type: "income",
        category: "Salario"
      }} />
    </>
  );
}
