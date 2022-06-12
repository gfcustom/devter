import styles from "./styles.module.css"

export default function Avatar({ alt, src, text, withText }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} alt={alt} src={src} title={alt} />
      {withText && <strong>{text}</strong>}
    </div>
  )
}
