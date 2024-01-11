import Link from "next/link";
import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { ReceiptGeneralInfoType } from "../../types/receiptTypes";
import { formatDate } from "../../utils/formatDate";
import { authContext } from "../../hooks/useAuth";
import { api } from "../../utils/fetchFunc";

const ReceiptsTable = () => {
  const { userToken } = useContext(authContext);
  const [receipts, setReceipts] = useState<ReceiptGeneralInfoType[]>([]);

  useEffect(() => {
    (async () => {
      const [err, data] = await api.receipts.getReceiptsList(
        userToken as string,
      );
      if (!err) {
        setReceipts(data);
      } else {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <div className={styles.ReceiptsTable__head}>
        <h3>Fecha de emisión</h3>
        <h3>Mes del recibo</h3>
        <h3>Año</h3>
      </div>
      <div className={styles.ReceiptsTable__content}>
        {receipts.map((receipt) => (
          <ReceiptRowComponent
            date={receipt.date}
            month={receipt.month}
            year={receipt.year}
            key={receipt.id}
            id={receipt.id}
          />
        ))}
      </div>
    </>
  );
};

// const receipts: ReceiptInfoType[] = [
//   {
//     date: "20/06/2023",
//     month: "agosto",
//     year: 2023,
//   },
//   {
//     date: "20/07/2023",
//     month: "septiembre",
//     year: 2023,
//   },
//   {
//     date: "20/08/2023",
//     month: "noviembre",
//     year: 2023,
//   },
// ];

const ReceiptRowComponent = ({
  date,
  month,
  year,
  id,
}: ReceiptGeneralInfoType) => {
  return (
    <Link
      href={`/user/receipt/${id}`}
      className={styles.ReceiptsTable__content__row}
    >
      <span>{formatDate(date)}</span>
      <span>{month}</span>
      <span>{year}</span>
    </Link>
  );
};

export { ReceiptsTable };
