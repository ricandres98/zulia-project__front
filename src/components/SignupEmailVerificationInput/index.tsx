import React, { FormEventHandler, useRef, useState } from "react";
import styles from "./styles.module.css";
import { ErrorMessage } from "../ErrorMessage";
import { LoadingMessage } from "../LoadingMessage";
import { api } from "../../utils/fetchFunc";
import { VerificationEmailHTTPResponse } from "../../types/verificationTypes";
import { SignupVerificationCodeInput } from "../SignupVerificationCodeInput";
import { useSignUpInfo } from "../../hooks/useSignUpInfo";
import { Console } from "console";

type SignupEmailVerificationInputPropsType = {
  stage: number;
  setStage: () => void;
};

const SignupEmailVerificationInput: React.FC<
  SignupEmailVerificationInputPropsType
> = ({stage, setStage}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const { ownerInfo, setOwnerInfoAndUpdateTime } = useSignUpInfo();
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.current !== null) {
      const formData = new FormData(form.current);
      const email = formData.get("email");
      console.log("EMAIL EN INPUT: ", email)
      setOwnerInfoAndUpdateTime({ 
        ...ownerInfo,
        email: email as string,
      });
      const [error, response] = await api.verifications.verifyEmail({ email: email as string });
      if(error) {
        setError(error.message)
      } else {
        setMailSent(true)
      }
    }
  };
  return (
    <>
      {!mailSent ?
        ( 
          <div>
            <form
              onSubmit={handleSubmit}
              className={styles["registry-step-3"]}
              ref={form}
            >
            <>
              <div>
                <label htmlFor="email">Introduzca su correo electrónico</label>
                <input type="email" id="email" name="email" required={true} />
              </div>
              {loading && <LoadingMessage />}
              {!loading && error && <ErrorMessage>{error}</ErrorMessage>}
              <button>Verificar</button>
            </>
            </form>
          </div>
          )
          :
          (
              <div>
                <p className={styles.message}>Email de verificación enviado. Revise su correo electrónico</p>
                <SignupVerificationCodeInput stage={stage} setStage={setStage}/>
              </div>
          )
        }
    </>
  );
};

export { SignupEmailVerificationInput };
