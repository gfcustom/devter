import Devit from "@c/Devit"
import { fetchLatestDevits } from "@c/../firebase/client"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
    <Head>
      <title>Inicio / Devter</title>
    </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({ id, userName, avatar, content, userId, createdAt, img }) => (
            <Devit
              key={id}
              id={id}
              createdAt={createdAt}
              avatar={avatar}
              userName={userName}
              img={img}
              content={content}
              userId={userId}
            />
          )
        )}
      </section>
      <nav>
        <Link href="/home">
          <a>Home</a>
        </Link>
        <Link href="/">
          <a>Search</a>
        </Link>
        <Link href="/compose/tweet">
          <a>Crear</a>
        </Link>
      </nav>

      <style jsx>
        {`
          header {
            align-items: center;
            border-bottom: 1px solid #eee;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
            height: 49px;
            position: sticky;
            top: 0;
            width: 100%;
            display: flex;
          }

          h2 {
            font-weight: 800;
            font-size: 21px;
            padding-left: 15px;
          }

          nav {
            bottom: 0;
            border-top: 1px solid #eee;
            height: 49px;
            position: sticky;
            width: 100%;
            background: #ffffff;
            display: flex;
          }

          nav a {
            display: flex;
            flex: 1 1 auto;
            justify-content: center;
            height: 100%;
            align-items: center;
          }
          nav a:hover {
            font-weight: bold;
          }
        `}
      </style>
    </>
  )
}
