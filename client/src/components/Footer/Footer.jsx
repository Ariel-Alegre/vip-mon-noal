import React from "react";
import styles from "./Footer.module.css";
import { FaTiktok } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
const Footer = () => {
  return (
    <footer className={styles.footerStyle}>
      <div className={styles.containerStyle}>
        <div className={styles.contactStyle}>
          <h4>
            Contacto:<a className={styles.res}>Vip Mon Noal</a>{" "}
          </h4>
          <p>
            Dirección:<a className={styles.res}>Tienda online</a>{" "}
          </p>
          <p>
            Email:
            <a  href="mailto:vipmonnoal2024@hotmail.com"  rel="noopener noreferrer" target="_blank" className={styles.res}>
              vipmonnoal2024@hotmail.com
            </a>
          </p>
          <p>
            WhatsApp:<a href="https://wa.me/+34617166097" className={styles.res}>+34 617 16 60 97</a>
          </p>
          <div className={styles.socialStyleMobile}>
          <a
            href="https://www.tiktok.com/@vipmonnoal2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.Social}>
              <div>
                <FaTiktok className={styles.icon_social} />
              </div>
              <div className={styles.SociaText}>Tik Tok</div>
            </div>
          </a>

          <a
            href="https://www.instagram.com/vipmonnoal2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.Social}>
              <div>
                <GrInstagram className={styles.icon_social} />
              </div>
              <div className={styles.SociaText}>Instagram</div>
            </div>
          </a>
        </div>
        </div>
        <div className={styles.socialStyle}>
          <a
            href="https://www.tiktok.com/@vipmonnoal2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.Social}>
              <div>
                <FaTiktok className={styles.icon_social} />
              </div>
              <div className={styles.SociaText}>Tik Tok</div>
            </div>
          </a>

          <a
            href="https://www.instagram.com/vipmonnoal2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.Social}>
              <div>
                <GrInstagram className={styles.icon_social} />
              </div>
              <div className={styles.SociaText}>Instagram</div>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

// Estilos en línea para el componente
const footerStyle = {
  background: "#000",
  color: "#ffc400",
  padding: "20px 0",
};

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1200px",
  margin: "0 auto",
};

const logoStyle = {
  flex: 1,
};

const logoImgStyle = {
  maxWidth: "100px",
};

const contactStyle = {
  flex: 1,
};

const socialStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  gap: "5em",
};

const iconStyle = {
  color: "#fff",
  fontSize: "1.5em",
  marginLeft: "10px",
  textDecoration: "none",
};

export default Footer;
