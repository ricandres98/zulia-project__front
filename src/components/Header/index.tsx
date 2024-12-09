import Link from "next/link";
import React, { useContext, useState } from "react";
import { BarsIcon } from "../../Icons/BarsIcon";
import { XMarkIcon } from "../../Icons/XMarkIcon";
import { UserIcon } from "../../Icons/UserIcon";
import { EnvelopeIcon } from "../../Icons/EnvelopeIcon";
import { authContext } from "../../hooks/useAuth";
import styles from "./styles.module.css";

interface PropTypes {
  isAdmin?: boolean;
  className?: string;
}

const Header = ({ className, isAdmin }: PropTypes) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuth, logout } = useContext(authContext);

  const navItems = isAdmin ? navItemsAdmin : navItemsUser;

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
            {!isAdmin && (
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
                    <button
                      onClick={logout}
                      className={styles["logout-button"]}
                    >
                      logout
                    </button>
                  </li>
                </ul>
              </nav>
            )}
            <button
              className={`${styles["menu-button"]} ${
                isAdmin ? styles.admin : null
              }`}
              onClick={() => setOpenMenu(true)}
            >
              <BarsIcon />
            </button>
          </>
        )}
      </header>
      {
        /*openMenu && */
        <NavBarMobile
          linkList={navItems}
          close={() => setOpenMenu(false)}
          hidden={!openMenu}
        />
      }
    </>
  );
};

export type LinkType = {
  name: string;
  linkTo: string;
  withIcon?: boolean;
  icon?: React.JSX.Element;
};

export type LinkList = LinkType[];

type NavBarMobileProps = {
  linkList: LinkList;
  close: () => void;
  hidden: boolean;
};

const NavBarMobile = ({ linkList, close, hidden }: NavBarMobileProps) => {
  const { logout } = useContext(authContext);
  return (
    <nav
      className={`${styles["navBar--mobile"]} ${hidden ? styles.hidden : null}`}
    >
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

const navItemsUser: LinkList = [
  {
    name: "notificar pago",
    linkTo: "/user/notify-payment",
  },
  {
    name: "datos",
    linkTo: "/user/info",
    withIcon: true,
    icon: <UserIcon color="#009993" />,
  },
  {
    name: "notificaciones",
    linkTo: "/",
    withIcon: true,
    icon: <EnvelopeIcon color="#009993" />,
  },
];

const navItemsAdmin: LinkList = [
  {
    name: "Consulta por apartamento",
    linkTo: "/admin/apartment",
  },
  {
    name: "Ver historial de movimientos",
    linkTo: "/admin/transactions",
  },
  {
    name: "Agregar un gasto",
    linkTo: "/admin/transactions/new-transaction",
  },
  {
    name: "Crear nuevo recibo",
    linkTo: "/admin/receipts",
  },
];

export { Header };
