import styles from "./page.module.css";
import Form from "@/app/setup/components/Form";
import {Metadata} from "next";
import CreateForm from "@/app/setup/components/CreateForm";

export const metadata: Metadata = {
    title: 'Mise en place de la partie',
    description: 'Choisissez vos joueurs, leurs rôle ainsi que leurs couleurs',
}

export default function page() {
    
    return (
        <main className={styles.setup}>
            <div className={`${styles.container} container`}>
                <h1>Mise en place de la partie</h1>
                <CreateForm />
            </div>
        </main>
    )
}