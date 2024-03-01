import styles from './ImgHome.module.css'

export default function ImgHome() {
    return (
        <div className={styles.bg_home}>
  <img src={require('../../Images/Logo/Logo.png')} alt="" />
        </div>
    )
}