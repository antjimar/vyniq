"use client";
import TransactionItem from "@/components/TransactionItem";
import { useState } from "react";

export default function Home() {
  console.log("Home ejecutándose")

  const [counter, setCounter] = useState(0);

  return (
    <>
      <p>Contador: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Incrementar</button>
      <TransactionItem />
      <TransactionItem />
    </>
  );
}
