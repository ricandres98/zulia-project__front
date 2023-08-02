import Link from "next/link";
import React, { useState } from "react";
import { BarsIcon } from "../../Icons/BarsIcon";
import { XMarkIcon } from "../../Icons/XMarkIcon";
import { UserIcon } from "../../Icons/UserIcon";
import { EnvelopeIcon } from "../../Icons/EnvelopeIcon";
import styles from "./styles.module.css";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Edificio Zulia</h1>
        <nav className={styles["navBar--desktop"]}>
          <ul>
            {navItems.map((item) => (
              <li key={item.linkTo}>
                <Link href="/">{item.withIcon ? item.icon : item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className={styles["menu-button"]}
          onClick={() => setOpenMenu(true)}
        >
          <BarsIcon />
        </button>
        {openMenu && (
          <NavBarMobile linkList={navItems} close={() => setOpenMenu(false)} />
        )}
      </header>
    </>
  );
};

type linkType = {
  name: string;
  linkTo: string;
  withIcon?: boolean;
  icon?: React.JSX.Element;
};

type linkList = linkType[];

type NavBarMobileProps = {
  linkList: linkList;
  close: () => void;
};

const NavBarMobile = ({ linkList, close }: NavBarMobileProps) => {
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
    linkTo: "/user",
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
