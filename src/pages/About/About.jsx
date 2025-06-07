//CSS
import styles from './About.module.css'

import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className={styles.about}>
      <h2> Sobre O Nex<span>Blog</span></h2>
      <p>Este projeto foi feito em React No front-end e firebase no backend</p>

      <Link to="/posts/create" className="btn">Criar Post</Link>
    </div>
  )
}

export default About