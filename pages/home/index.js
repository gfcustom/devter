import Devit from "@c/Devit"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetch("/api/statuses/home_timeline")
        .then((res) => res.json())
        .then(setTimeline)
  }, [user])

  return (
    <>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map((devit) => (
          <Devit
            key={devit.id}
            id={devit.id}
            avatar={devit.avatar}
            username={devit.username}
            message={devit.message}
          />
        ))}
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
