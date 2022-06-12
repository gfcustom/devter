import Avatar from "@c/Avatar"

export default function Devit({
  id,
  userName,
  avatar,
  content,
  userId,
  createdAt,
}) {
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
            <date>{createdAt}</date>
          </header>
          <p>{content}</p>
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
          date {
            color: #555;
            font-size: 14px;
          }
        `}
      </style>
    </>
  )
}
