import React from "react";

type SignupIDInputPropsType = {
  // eslint-disable-next-line no-unused-vars
  setStage: () => void;
};

const SignupIDInput: React.FC<SignupIDInputPropsType> = ({ setStage }) => {
  return (
    <section className="registry-step registry-step-1">
      <label htmlFor="cedula">Cédula de identidad:</label>
      <input type="text" name="owner_id" id="cedula" />
      <button onClick={setStage}>Next stage</button>
    </section>
  );
};

export { SignupIDInput };
