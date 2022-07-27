import Link from "next/link";
import Image from "next/image";
import PageHead from "../modules/PageHead";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <PageHead />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="address">Address Book Demo</Link>
        </h1>

        <p className={styles.description}>
          This Address Book Demo uses NextJS, ReactQuery & Formik;
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
