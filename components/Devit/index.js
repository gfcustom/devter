import Avatar from "@c/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Devit({
  id,
  userName,
  avatar,
  content,
  userId,
  img,
  createdAt,
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push("/status/[id]", `/status/${id}`)
  }
  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> - </span>
            <Link href={`/status/[id]`} as={`/status/${id}`}>
              <a className="time">
                <time className="timeago" title={createdAtFormated}>
                  {timeago}
                </time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>

      <style jsx>
        {`
          article {
            display: flex;
            padding: 10px 15px;
          }
          article:hover{
            background:#f5f8fa;
          }

          div {
            padding-right: 10px;
          }

          p {
            margin: 0;
          }

          article {
            border-bottom: 2px solid #eee;
          }
          span.timeago {
            color: #555;
            font-size: 14px;
          }
          img {
            border-radius: 
            width: 100%;
            height:auto;
            border-radius:10px;
          }
          a{
            color:#555;
            font-size:14px;
            text-decoration: none;
          }
          a:hover{
            text-decoration: underline;
          }
          a.time{

          }
        `}
      </style>
    </>
  )
}
