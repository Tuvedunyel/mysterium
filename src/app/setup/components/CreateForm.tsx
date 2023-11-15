"use client";
import Form from "@/app/setup/components/Form";
import { useState } from "react";
import styles from "./form.module.css";

export default function CreateForm() {
  const [playerNumber, setPlayerNumber] = useState(2);

  return (
    <>
      {[...Array(playerNumber)].map((_, index) => (
        <Form id={index} key={index} />
      ))}
      <button
        className={styles.btn}
        onClick={() => setPlayerNumber(playerNumber + 1)}
        disabled={playerNumber === 7}
      >
        <span>Ajouter un joueur</span>
      </button>
    </>
  );
}
