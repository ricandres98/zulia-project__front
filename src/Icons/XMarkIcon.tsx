import React from "react";
import styles from "./styles.module.css";

interface IconPropTypes {
  color?: "red" | "white";
}

const XMarkIcon = ({ color }: IconPropTypes) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${styles.size} ${color && styles[color]}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export { XMarkIcon };
