import styles from './ImgHome.module.css'

export default function ImgHome() {
    return (
        <div className={styles.bg_home}>
            <div className={styles.box_home}>

            <div>

  <img src={require('../../Images/Logo/Logo.png')} alt="" />
            </div>
  <div className={styles.moving_text_container}>
      <h1 className={styles.moving_text}>Envío gratis a la península excepto ( islas ,Ceuta y  melilla consulten precio)!!</h1>
    </div>
        </div>
            </div>
    )
}