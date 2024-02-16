"use client";
import { FormEvent, useState } from "react";
import styles from "./form.module.css";
import axios from "axios";
import Image from "next/image";

export default function Form({ id }: { id: number }) {
  const [isSet, setIsSet] = useState(false);
  const [player, setPlayer] = useState<{ [key: string]: string } | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data: { playerName: string; role: string; color: string; id?: string };

    if (!isEdit) {
      data = {
        playerName: e.currentTarget.nom.value,
        role: (e.currentTarget.role as any).value,
        color: e.currentTarget.color.value,
      };
    } else {
      data = {
        playerName: e.currentTarget.nom.value,
        role: (e.currentTarget.role as any).value,
        color: e.currentTarget.color.value,
        id: player!.id,
      };
    }

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };

    const response = !isEdit
      ? await axios.post(`/api/player`, options)
      : await axios.patch(`/api/player/${player!.id}`, options);

    if (isEdit) {
      setPlayer(response.data.player);
    } else {
      setPlayer(response.data.data.data);
    }
    setIsSet(true);
  };

  const toggleEdit = () => {
    setIsSet(false);
    setIsEdit(true);
  };

  const handleEdit = async () => {
    // const response = await axios.patch()
  };

  const handleDelete = async () => {
    const response = await axios.delete(`/api/player/${player!.id}`);
    setIsSet(false);
  };

  const setColor = (color: string) => {
    if (color.toLocaleLowerCase() === "red") {
      return { background: "#b72d25", name: "Rouge" };
    }
    if (color.toLocaleLowerCase() === "yellow") {
      return { background: "#bfb92b", name: "Jaune" };
    }
    if (color.toLocaleLowerCase() === "purple") {
      return { background: "#8a3694", name: "Violet" };
    }
    if (color.toLocaleLowerCase() === "blue") {
      return { background: "#2592e0", name: "Bleu" };
    }
    if (color.toLocaleLowerCase() === "white") {
      return { background: "#a6b1c2", name: "Blanc" };
    }
    if (color.toLocaleLowerCase() === "black") {
      return { background: "#252d30", name: "Noir" };
    }
    return { background: "transparent", name: "Couleur invalide" };
  };

  return (
    <>
      {isSet ? (
        <section className={styles.playerName}>
          <div className={styles.container}>
            <strong>{player!.name}</strong>
            <strong>{player!.role}</strong>
            <span style={setColor(player!.color)}></span>
            <button aria-label="Modifier" onClick={toggleEdit}>
              <Image
                src="/edit.svg"
                alt="modifier le joueur"
                width={20}
                height={25}
              />
            </button>
            <button aria-label="supprimer" onClick={() => handleDelete()}>
              <Image
                src="/delete.svg"
                alt="Supprimer ce joueur"
                width={25}
                height={25}
              />
            </button>
          </div>
        </section>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            id="nom"
            placeholder="Nom"
            defaultValue={player && player.name ? player.name : ""}
          />
          <select
            name="role"
            id="role"
            required
            defaultValue={player && player.role ? player.role : "default"}
          >
            <option defaultValue="default" disabled={true}>
              --Choisir un role--
            </option>
            <option value="medium">Medium</option>
            <option value="fantome">Fantôme</option>
          </select>
          <select
            name="color"
            id="color"
            required
            defaultValue={player && player.color ? player.color : "default"}
          >
            <option defaultValue="default" disabled={true}>
              --Choisir une couleur--
            </option>
            <option value="red">Rouge</option>
            <option value="yellow">Jaune</option>
            <option value="purple">Violet</option>
            <option value="white">Blanc</option>
            <option value="blue">Bleu</option>
            <option value="dark">Noir</option>
          </select>
          <button className={styles.btn}>
            <span>Valider</span>
          </button>
        </form>
      )}
    </>
  );
}
