import Avatar from "@c/Avatar"
import useTimeAgo from "hooks/useTimeAgo"

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

  return (
    <>
      <article>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> - </span>
            <span className="timeago">{timeago}</span>
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
        `}
      </style>
    </>
  )
}
