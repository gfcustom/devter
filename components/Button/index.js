export default function Button({ children, disabled, onClick }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>{children}</button>

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
            user-select:none;
          }
          button:hover {
            background: #5042a3;
          }
          button[disabled]{
            pointer-events:none;
            opacity:0.2;
          }
        `}
      </style>
    </>
  )
}
