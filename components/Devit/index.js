import Avatar from "@c/Avatar"

export default function Devit({ avatar, username, message, id }) {
  return (
    <>
      <article>
        <div>
          <Avatar src={avatar} alt={username} />
        </div>
        <div>
          <strong>{username}</strong>
          <p>{message}</p>
        </div>
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
        `}
      </style>
    </>
  )
}
