import { useState } from "react";
import { Header } from "../../components/Header";
import { SignupIDInput } from "../../components/SignupIDInput";
import { SignupApartmentInput } from "../../components/SignupApartmentInput";
import { SignupEmailPswInput } from "../../components/SignupEmailPswInput";
import { SignupOwnerDataInput } from "../../components/SignupOwnerDataInput";
import styles from "./styles.module.css";

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

  return (
    <>
      <Header />
      <main className={styles["main-container"]}>
        <h1>Registro</h1>
        <SignupIDInput setStage={() => setStage(2)} />
        {stage >= 2 && <SignupOwnerDataInput setStage={() => setStage(3)} />}
        {stage >= 3 && (
          <SignupApartmentInput
            apartmentsArray={apartmentsArray}
            setStage={() => setStage(4)}
          />
        )}
        {stage >= 4 && <SignupEmailPswInput />}
      </main>
    </>
  );
};

export default SignUpPage;
