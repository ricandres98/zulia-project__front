import React from "react";
import { ReceiptDetailedInfoType } from "../../types/receiptTypes";
import { formatMonth } from "../../utils/formatDate";
import styles from "./styles.module.css";

interface PropTypes {
  receiptInfo: ReceiptDetailedInfoType | undefined;
  loading: boolean;
  error: boolean;
}

const ReceiptGeneralInfo = ({ receiptInfo, loading, error }: PropTypes) => {
  if (loading) {
    return <p>Cargando...</p>;
  } else if (error) {
    return <p>Al parecer ha habido un error</p>;
  } else if (receiptInfo) {
    const subtotal: number = receiptInfo.period.commonExpenses
      .map((expense) => expense.amount)
      .reduce((prev, curr) => prev + curr, 0);

    const reserva20 = subtotal * 0.2;
    const total = subtotal + reserva20;
    const aliquot = (total * receiptInfo.apartment.aliquot) / 100;

    return (
      <>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className={styles.GeneralInfo}>
            <div className={styles.GeneralInfo__items}>
              <div className={styles.item}>
                <span>Inmueble</span>
                <span>{receiptInfo?.apartment.apartmentNumber}</span>
              </div>
              <div className={styles.item}>
                <span>Propietario</span>
                <span>{`${receiptInfo?.apartment.owner.firstName} ${receiptInfo?.apartment.owner.lastName}`}</span>
              </div>
              <div className={styles.item}>
                <span>Mes</span>
                <span>{formatMonth(receiptInfo?.period.month as number)}</span>
              </div>
              <div className={styles.item}>
                <span>Año</span>
                <span>{receiptInfo?.period.year}</span>
              </div>
              <div className={styles.item}>
                <span>Alícuota</span>
                <span>{receiptInfo?.apartment.aliquot.toFixed(5)}</span>
              </div>
              <div className={`${styles.item} ${styles.total}`}>
                <span>Monto a pagar</span>
                {<span>{aliquot.toFixed(2)}</span>}
              </div>
            </div>
            <div className={styles.total}>
              <span>Monto a pagar</span>
              {<span>Bs {aliquot.toFixed(2)}</span>}
            </div>
          </div>
        )}
      </>
    );
  }
};

export { ReceiptGeneralInfo };
