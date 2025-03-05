import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="logo">
        <Image
          src="/cosmos-logo.png"
          alt="Logo"
          width={250}
          height={75}
        />
      </div>
      <div className={styles.navContainer}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <div className={styles.linkContainer}>
              <Link href="/">Home</Link>
            </div>
          </li>
          <li className={styles.navItem}>
            <div className={styles.dropdown}>
              <div className={styles.linkContainer}>
                <Link href="/about">About Us</Link>
              </div>
              <ul className={styles.dropdownMenu}>
                <div className={styles.dropdownList}>
                  <li>
                    <Link href="/web-design">Our Company</Link>
                  </li>
                  <li>
                    <Link href="/seo">Join Us</Link>
                  </li>
                </div>
              </ul>
            </div>
          </li>
          <li className={styles.navItem}>
            <div className={styles.linkContainer}>
              <Link href="/product">Product</Link>
            </div>
          </li>
          <li className={styles.navItem}>
            <div className={styles.dropdown}>
              <div className={styles.linkContainer}>
                <Link href="/solution">Solution</Link>
              </div>
              <ul className={styles.dropdownMenu}>
                <div className={styles.dropdownList}>
                  <li>
                    <Link href="/web-design">Web Design</Link>
                  </li>
                  <li>
                    <Link href="/seo">SEO</Link>
                  </li>
                  <li>
                    <Link href="/marketing">Marketing</Link>
                  </li>
                </div>
              </ul>
            </div>
          </li>
          <li className={styles.navItem}>
            <div className={styles.linkContainer}>
              <Link href="/service-support">Service Support</Link>
            </div>
          </li>
        </ul>
      </div>
      <style jsx>{`
        header {
          display: flex;
          justify-content:space-between;
          background-color: #ffffff;
          color: white;
          padding-left: 30px;
          padding-right: 30px;
          height: 80px;
        }
        nav ul {
          list-style: none;
          padding: 0;
        }
        nav li {
          display: inline;
          margin-right: 20px;
        }
        nav a {
          color: white;
          text-decoration: none;
        }
      `}</style>
    </header>
  );
};

export default Header;
