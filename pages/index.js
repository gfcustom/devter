import Head from "next/head"
import Button from "components/Button"
import styles from "styles/Home.module.css"
import { loginWithGoogle } from "../firebase/client"

import { useEffect } from "react"
import Avatar from "components/Avatar"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"


export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGoogle()
      // .then((user) => {
      // console.log(user)
      // const {avatar, userName} = user
      //      setUser(user)
      //  })
      .catch((err) => {
        console.log(err)
      })
  }

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
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>Entrar con Google</Button>
          )}
          {user && user.avatar && (
            <div>
              <Avatar
                alt={user.username}
                src={user.avatar}
                withText
                text={user.username}
              />
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
