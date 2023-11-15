import styles from './page.module.css'
import Link from "next/link";

export default function Home() {

  return (
    <main>
      <div className="container">
        <h1>Mysterium</h1>
        <Link href="/setup" className={styles.link}>
          <span>Lancer une partie</span>
        </Link>
      </div>
    </main>
  )
}
