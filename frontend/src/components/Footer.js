import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
  const styles = {
    footer: {
      backgroundColor: '#0f1c60',
      color: 'rgb(246, 255, 177)',
      padding: '20px 0',
    },
    footerRow: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    footerCol: {
      width: '33.33%',
      marginBottom: '20px',
    },
    footerColSmall: {
      width: '50%',
      marginBottom: '20px',
    },
    footerColXSmall: {
      width: '100%',
    },
    h4: {
      fontSize: '18px',
      marginBottom: '35px',
      fontWeight: '500',
      position: 'relative',
    },
    h4After: {
      content: "''",
      position: 'absolute',
      left: '0',
      bottom: '-10px',
      backgroundColor: 'rgba(0, 255, 21, 0.873)',
      height: '3px',
      width: '40px',
      boxSizing: 'border-box',
    },
    ul: {
      listStyleType: 'none',
      paddingLeft: '5px',
    },
    li: {
      marginBottom: '7px',
    },
    a: {
      fontSize: '15px',
      color: 'white',
      textDecoration: 'none',
      display: 'block',
      fontWeight: '400',
    },
    aHover: {
      paddingLeft: '10px',
      color: 'rgb(98, 255, 0)',
      fontWeight: '700',
    },
    copyright: {
      textAlign: 'center',
      borderTop: '1px solid white',
      padding: '20px',
      marginBottom: '-10px',
      backgroundColor: '#0f1c60',
      color: 'white',
    },
    i: {
      marginRight: '10px',
    },
    span: {
      paddingLeft: '5px',
      lineHeight: '1.6',
      fontWeight: 'bold',
      color: 'white',
    },
    '@media (max-width: 770px)': {
      footerCol: {
        width: '50%',
      },
    },
    '@media (max-width: 500px)': {
      footerCol: {
        width: '100%',
      },
    },
  };

  return (
    <>
      <footer style={styles.footer}>
        <Container>
          <div style={styles.footerRow}>
            <div style={styles.footerCol}>
              <h4 style={styles.h4}>Navigations</h4>
              <ul style={styles.ul}>
                <li style={styles.li}><a href="home" style={styles.a}>Home</a></li>
                <li style={styles.li}><a href="about" style={styles.a}>About Us</a></li>
                <li style={styles.li}><a href="contact" style={styles.a}>Contact Us</a></li>
                {/* <li style={styles.li}><a href="queries" style={styles.a}>FAQ</a></li> */}
              </ul>
            </div>
            <div style={styles.footerCol}>
              <h4 style={styles.h4}>Contact Info</h4>
              <ul style={styles.ul}>
                <li style={styles.li}><a href="#"><i className="fa-solid fa-phone" style={styles.i}></i><span style={styles.span}>+91 1234567890</span></a></li>
                <li style={styles.li}><a href="#"><i className="fa-solid fa-envelope" style={styles.i}></i><span style={styles.span}>contactcoderarena2003@gmail.com</span></a></li>
                <li style={styles.li}><a href="#"><i className="fa-solid fa-location-dot" style={styles.i}></i><span style={styles.span}>Sricity Chittoor, 517646</span></a></li>
              </ul>
            </div>
          </div>
        </Container>
      </footer>
      <p style={styles.copyright}>
        <i className="fa-regular fa-copyright" style={styles.i}></i>
        2024 Copyright:<span style={styles.span}>CoderArena.com</span>
      </p>
    </>
  );
}
