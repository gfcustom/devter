export default function Button({ children, onClick }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>

      <style jsx>
        {`
          button {
            background: #362581;
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 14px;
            cursor: pointer;
            transition: 0.3s ease;
          }
          button:hover {
            background: #5042a3;
          }
        `}
      </style>
    </>
  )
}
