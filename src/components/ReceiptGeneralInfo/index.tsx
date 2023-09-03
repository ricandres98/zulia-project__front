import { ReceiptDetailedInfoType } from "../../types/receiptTypes";
import styles from "./styles.module.css";

interface PropTypes {
  receiptInfo: ReceiptDetailedInfoType | undefined;
}

const ReceiptGeneralInfo = ({ receiptInfo }: PropTypes) => {
  return (
    <div className={styles.GeneralInfo}>
      <div className={styles.GeneralInfo__items}>
        <div className={styles.item}>
          <span>Inmueble</span>
          <span>{receiptInfo?.property}</span>
        </div>
        <div className={styles.item}>
          <span>Propietario</span>
          <span>{receiptInfo?.owner}</span>
        </div>
        <div className={styles.item}>
          <span>Mes</span>
          <span>{receiptInfo?.billedMonth}</span>
        </div>
        <div className={styles.item}>
          <span>Año</span>
          <span>{receiptInfo?.year}</span>
        </div>
        <div className={styles.item}>
          <span>Alicuota</span>
          <span>{receiptInfo?.aliquot}</span>
        </div>
        <div className={`${styles.item} ${styles.total}`}>
          <span>Monto a pagar</span>
          <span>{receiptInfo?.owedAmount.toFixed(2)}</span>
        </div>
      </div>
      <div className={styles.total}>
        <span>Monto a pagar</span>
        <span>Bs {receiptInfo?.owedAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export { ReceiptGeneralInfo };
