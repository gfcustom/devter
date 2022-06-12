import Head from "next/head";
import Button from "../components/Button";
import styles from "../styles/Home.module.css";

import { loginWithGoogle, onAuthStateChanged } from "../firebase/client";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  const handleClick = () => {
    loginWithGoogle()
      .then((user) => {
        // console.log(user)
        // const {avatar, userName} = user
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mejor Momento</title>
        <meta
          name="description"
          content="Coordinar Eventos ahora es más fácil"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Mejor Momento</h1>
        <img alt="Logo" src="/logo.png" className={styles.logoHome} />
        <div>
          {user === null && (
            <Button onClick={handleClick}>Entrar con Google</Button>
          )}
          {user && user.avatar && (
            <div>
              <img src={user.avatar} />
              <strong>{user.username}</strong>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
