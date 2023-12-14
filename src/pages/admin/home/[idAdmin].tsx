import Link from "next/link";
import { Header, linkList } from "../../../components/Header";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";
import { Layout } from "../../../containers/Layout";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <>
      <AuthorizationContainer>
        <Header />
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

const navItems: linkList = [
  {
    name: "Consulta por apartamento",
    linkTo: "/admin/apartment",
  },
  {
    name: "Agregar un gasto",
    linkTo: "/admin/expenses",
  },
  {
    name: "Crear nuevo recibo",
    linkTo: "/admin/receipts",
  },
];

export default Home;
