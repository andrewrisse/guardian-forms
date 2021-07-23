import React from "react";
import styles from "./ErrorText.module.css";

interface ErrorTextProps  {
    text: string,
}

const ErrorText = ({text} : ErrorTextProps) => (
    <span className={styles.errorText}>{text}</span>
)

export default ErrorText;
