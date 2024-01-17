import Link from "next/link";
import React, { useContext, useState } from "react";
import { BarsIcon } from "../../Icons/BarsIcon";
import { XMarkIcon } from "../../Icons/XMarkIcon";
import { UserIcon } from "../../Icons/UserIcon";
import { EnvelopeIcon } from "../../Icons/EnvelopeIcon";
import { authContext } from "../../hooks/useAuth";
import styles from "./styles.module.css";

interface PropTypes {
  className?: string;
}

const Header = ({ className }: PropTypes) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuth, logout } = useContext(authContext);

  return (
    <>
      <header
        className={className ? `${styles.header} ${className}` : styles.header}
      >
        <h1 className={styles.header__title}>
          <Link href="/">Edificio Zulia</Link>
        </h1>
        {!!isAuth && (
          <>
            <nav className={styles["navBar--desktop"]}>
              <ul>
                {navItems.map((item) => (
                  <li key={item.linkTo}>
                    <Link href={item.linkTo}>
                      {item.withIcon ? item.icon : item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button onClick={logout} className={styles["logout-button"]}>
                    logout
                  </button>
                </li>
              </ul>
            </nav>
            <button
              className={styles["menu-button"]}
              onClick={() => setOpenMenu(true)}
            >
              <BarsIcon />
            </button>
          </>
        )}
      </header>
      {openMenu && (
        <NavBarMobile linkList={navItems} close={() => setOpenMenu(false)} />
      )}
    </>
  );
};

export type linkType = {
  name: string;
  linkTo: string;
  withIcon?: boolean;
  icon?: React.JSX.Element;
};

export type linkList = linkType[];

type NavBarMobileProps = {
  linkList: linkList;
  close: () => void;
};

const NavBarMobile = ({ linkList, close }: NavBarMobileProps) => {
  const { logout } = useContext(authContext);
  return (
    <nav className={styles["navBar--mobile"]}>
      <div className={`${styles.close} ${styles.row}`}>
        <button className={styles["close-button"]} onClick={close}>
          <XMarkIcon />
        </button>
      </div>
      <ul>
        {linkList.map((link) => (
          <li key={link.linkTo} className={styles.row}>
            <Link href={link.linkTo}>{link.name}</Link>
          </li>
        ))}
        <li className={styles.row}>
          <button onClick={logout} className={styles["logout-button"]}>
            logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

const navItems: linkList = [
  {
    name: "notificar pago",
    linkTo: "/notify-payment",
  },
  {
    name: "datos",
    linkTo: "/user/info",
    withIcon: true,
    icon: <UserIcon color="#009993" />,
  },
  {
    name: "notificaciones",
    linkTo: "/notifications",
    withIcon: true,
    icon: <EnvelopeIcon color="#009993" />,
  },
];

export { Header };
