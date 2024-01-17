import React, { useEffect } from "react";
import { Header } from "../../../components/Header";
import { ReceiptGeneralInfo } from "../../../components/ReceiptGeneralInfo";
import { ReceiptDetailedInfo } from "../../../components/ReceiptDetailedInfo";
import { ReceiptDetailedInfoType } from "../../../types/receiptTypes";
import styles from "./styles.module.css";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";
import { api } from "../../../utils/fetchFunc";
import { useRouter } from "next/router";
import { authContext } from "../../../hooks/useAuth";

export default function ReceiptPage() {
  const [receiptInfo, setReceiptInfo] = React.useState<
    ReceiptDetailedInfoType | undefined
  >(undefined);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const { userToken } = React.useContext(authContext);

  const router = useRouter();
  // const { getReceiptInfo } = api.receipts.getReceiptInfo;

  useEffect(() => {
    // const { getReceiptInfo } = fetchFunc();

    const fetchData = async () => {
      const { id } = router.query;
      const [err, data] = await api.receipts.getReceiptInfo(
        parseInt(id as string),
        userToken as string,
      );
      setLoading(false);
      if (!err) {
        setReceiptInfo(data);
      } else {
        setError(true);
        console.error(err);
      }
    };

    if (router.isReady) {
      fetchData();
    }
  }, [router, userToken]);

  return (
    <>
      <AuthorizationContainer>
        <Header />
        <main className={styles["main-container"]}>
          <h2>Apartamento {receiptInfo?.apartment.apartmentNumber}</h2>
          <ReceiptGeneralInfo
            receiptInfo={receiptInfo}
            loading={loading}
            error={error}
          />
          <ReceiptDetailedInfo
            receiptInfo={receiptInfo}
            loading={loading}
            error={error}
          />
        </main>
      </AuthorizationContainer>
    </>
  );
}
