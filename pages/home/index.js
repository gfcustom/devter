import Devit from "@c/Devit"
import { fetchLatestDevits } from "@c/../firebase/client"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({ id, userName, avatar, content, userId, createdAt }) => (
            <Devit
              key={id}
              id={id}
              createdAt={createdAt}
              avatar={avatar}
              userName={userName}
              content={content}
              userId={userId}
            />
          )
        )}
      </section>
      <nav></nav>

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
            position: fixed;
            width: 100%;
            background: #ffffff;
          }
        `}
      </style>
    </>
  )
}
