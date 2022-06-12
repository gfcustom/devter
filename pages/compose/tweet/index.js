import Button from "@c/Button"
import { addDevit } from "@c/../firebase/client"
import useUser from "hooks/useUser"
import { useState } from "react"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const router = useRouter()

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    setStatus(COMPOSE_STATES.LOADING)

    event.preventDefault()

    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleChange}
          placeholder="Pon Algo!"
          value={message}
        ></textarea>
        <div>
          <Button disabled={isButtonDisabled}>Devitear</Button>
        </div>
      </form>
      <style jsx>
        {`
          div {
            padding: 15px;
          }
          textarea {
            min-height: 200px;
            width: 100%;
            font-size: 21px;
            outline: 0;
            border: 0;
            resize: none;
            padding: 15px;
          }
        `}
      </style>
    </>
  )
}
