import Button from "@c/Button"
import { addDevit } from "@c/../firebase/client"
import useUser from "hooks/useUser"
import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import Avatar from "@c/Avatar"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATE = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  //  const [task, setTask] = useState(null)
  const [imageURL, setImageURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  // useEffect(() => {
  //   if (task) {
  //      const onProgress = () => {}
  //     const onError = () => {}
  //     const onComplete = () => {
  //       task.snapshot.ref.getDownloadURL().then(setImageURL)
  //      }
  //      task.on("state_changed", onProgress, onError, onComplete)
  //    }
  //  }, [task])

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
      img: imageURL,
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

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
    const file = e.dataTransfer?.files[0]
    if (!file) return
    // const task = uploadImage(file);
    const storage = getStorage()
    const storageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    if (file) {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const prog = Math.round(
          //    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          //  );
          // console.log("Upload is " + progress + "% done");
          // setProgress(prog);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused")
              break
            case "running":
              console.log("Upload is running")
              break
          }
        },
        (error) => {
          alert(error)
        },
        () => {
          console.log("onComplete")
          console.log(uploadTask)
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url)
            setImageURL(url)
          })
        }
      )
    }
  }

  return (
    <>
      <Head>
        <title>Crear un Devit</title>
      </Head>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="Pon Algo!"
            value={message}
          ></textarea>
          {imageURL && (
            <section className="remove-img">
              <button onClick={() => setImageURL(null)}>X</button>
              <img src={imageURL} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>
      <style jsx>
        {`
          div {
            padding: 15px;
          }
          form {
            padding: 10px;
          }
          textarea {
            min-height: 200px;
            width: 100%;
            font-size: 21px;
            outline: 0;
            border: ${
              drag === DRAG_IMAGE_STATE.DRAG_OVER
                ? "3px dashed #09f"
                : "3px solid transparent"
            };
            resize: none;
            padding: 15px;
          }
          img {
            border-radius: 
            width: 100%;
            height:auto;
            border-radius:10px;
          }
          section.remove-img{
            position:relative;
            
          }
          section.remove-img>button{
            position: absolute;
            background: #00000069; 
            border-radius: 999px;
            border: 0;
            color: #fff;
            font-size: 25px;
            padding: 5px 12px;
          }
          .form-container{
            display:flex;
            justify-content: flex-start;
            align-items: flex-start;
          }
          .avatar-container{
            padding-top:10px;
            padding-left:10px;
          }
        `}
      </style>
    </>
  )
}
