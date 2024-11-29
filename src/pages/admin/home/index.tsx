import Link from "next/link";
import { Header, LinkList } from "../../../components/Header";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";
import { Layout } from "../../../containers/Layout";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <>
      <AuthorizationContainer>
        <Header isAdmin={true} />
        <Layout>
          <ul className={styles["nav-list"]}>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.linkTo}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </Layout>
      </AuthorizationContainer>
    </>
  );
};

const navItems: LinkList = [
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

export default Home;
