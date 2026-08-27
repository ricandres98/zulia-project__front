import React, { FormEventHandler, useRef, useState } from "react";
import styles from "./styles.module.css";
import { ErrorMessage } from "../ErrorMessage";
import { LoadingMessage } from "../LoadingMessage";
import { api } from "../../utils/fetchFunc";
import { useSignUpInfo } from "../../hooks/useSignUpInfo";

type SignupVerificationCodeInputPropsType = {
  stage: number;
  setStage: () => void;
};

const SignupVerificationCodeInput: React.FC<
SignupVerificationCodeInputPropsType
> = ({stage, setStage}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { ownerInfo } = useSignUpInfo();

  const handleClick: FormEventHandler = async () => {
    setLoading(true);
    setError("");

    const { email } = ownerInfo;
    const [error, response] = await api.verifications.verifyCode({
      code: code as string,
      email: email as string,
    });
    setLoading(false);
    console.log([error, response])
    if (error) {
      setError(error.message);
    } else {
      setIsVerified(true);
      setStage();
    }
    // }
  };

    return (
      <>
        {!isVerified ? 
          (
            <div
              className={styles["registry-step-3"]}
            >
              <div>
                <label htmlFor="code">Ingrese el código que recibió:</label>
                <input 
                  onChange={(e) => setCode(e.target.value)} 
                  value={code} 
                  id="code" 
                  required={true} 
                  onSubmit={(e)=> e.preventDefault()}
                  />
              </div>
              {loading && <LoadingMessage />}
              {!loading && error && <ErrorMessage>{error}</ErrorMessage>}
              <button type="button" onClick={handleClick}>Enviar</button>
            </div>
          ):(
            <div>
              <p>Email verificado exitosamente</p>
            </div>
          )}
      </>
    );
  };

export { SignupVerificationCodeInput };
