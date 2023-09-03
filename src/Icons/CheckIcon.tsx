import React from "react";
import styles from "./styles.module.css";

interface IconPropTypes {
  color?: "green" | "white";
}

const CheckIcon = ({ color }: IconPropTypes) => {
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
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
};

export { CheckIcon };
