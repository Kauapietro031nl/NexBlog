import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer_text}>Escreva sobre o que você tem interesse!</p>
      <p className={styles.copyright}>Nex Blog &copy; 2025</p>
    </footer>
  )
}

export default Footer