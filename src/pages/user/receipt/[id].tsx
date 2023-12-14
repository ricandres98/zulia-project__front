import React, { useEffect } from "react";
import { Header } from "../../../components/Header";
import { ReceiptGeneralInfo } from "../../../components/ReceiptGeneralInfo";
import { ReceiptDetailedInfo } from "../../../components/ReceiptDetailedInfo";
import { ReceiptDetailedInfoType } from "../../../types/receiptTypes";
import styles from "./styles.module.css";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";
import { fetchFunc } from "../../../utils/fetchFunc";
import { useRouter } from "next/router";

// const receiptInfo: ReceiptInfo = {
//   property: "A9",
//   owner: "Ricardo Ojeda",
//   billedMonth: "mayo",
//   year: 2023,
//   aliquot: 3.7643,
//   owedAmount: 217.28,
//   expenses: [
//     {
//       description:
//         "Previsión bono alimenticio trabajador residencial según decreto",
//       amount: 1000,
//     },
//     {
//       description: "CANTV Conserjería",
//       amount: 126.34,
//     },
//     {
//       description: "Hidrocapital junio",
//       amount: 2116.32,
//     },
//   ],
// };

export default function ReceiptPage() {
  const [receiptInfo, setReceiptInfo] = React.useState<
    ReceiptDetailedInfoType | undefined
  >(undefined);

  const router = useRouter();

  useEffect(() => {
    const { getReceiptInfo } = fetchFunc();
    const fetchData = async () => {
      const { id } = router.query;
      const [err, data] = await getReceiptInfo(parseInt(id as string));
      if (!err) {
        setReceiptInfo(data);
      } else {
        console.error(err);
      }
    };

    if (router.isReady) {
      fetchData();
    }
  }, [router]);

  return (
    <>
      <AuthorizationContainer>
        <Header />
        <main className={styles["main-container"]}>
          <h2>Apartamento {receiptInfo?.apartment.apartmentNumber}</h2>
          <ReceiptGeneralInfo receiptInfo={receiptInfo} />
          {<ReceiptDetailedInfo receiptInfo={receiptInfo} />}
        </main>
      </AuthorizationContainer>
    </>
  );
}
