import { useState } from "react";
import { Header } from "../../components/Header";
import { SignupIDInput } from "../../components/SignupIDInput";
import { SignupApartmentInput } from "../../components/SignupApartmentInput";
import { SignupEmailVerificationInput } from "../../components/SignupEmailVerificationInput";
import { SignupOwnerDataInput } from "../../components/SignupOwnerDataInput";
import styles from "./styles.module.css";
import { SignupPswInput } from "../../components/SignupPswInput";
function assignApartments(array: string[], letter: string) {
  for (let i = 1; i < 13; i++) {
    array.push(letter + i);
  }
}

const SignUpPage = () => {
  const [stage, setStage] = useState(1);
  let apartmentsArray: string[] = [];

  apartmentsArray.push("LOC");
  assignApartments(apartmentsArray, "A");
  assignApartments(apartmentsArray, "B");

  console.log("current stage is:", stage);

  return (
    <>
      <Header />
      <main className={styles["main-container"]}>
        <h1>Registro</h1>
        <SignupIDInput
          stage={stage}
          setStage={() => {
            // This is meant to force the re-rendering of the next
            // component each time the ID is set
            setStage(0);
            setTimeout(() => {
              setStage(2);
            }, 10);
          }}
        />
        {stage >= 2 && (
          <SignupOwnerDataInput stage={stage} setStage={() => setStage(3)} />
        )}
        {stage >= 3 && (
          <SignupApartmentInput
            stage={stage}
            apartmentsArray={apartmentsArray}
            setStage={() => setStage(4)}
            />
          )}
        {stage >= 4 && (
          <SignupEmailVerificationInput 
            stage={stage} 
            setStage={() => setStage(5)}
          />
        )}
        {stage >= 5 && <SignupPswInput />}
      </main>
    </>
  );
};

export default SignUpPage;
