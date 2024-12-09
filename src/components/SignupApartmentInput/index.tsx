import React from "react";

type SignupApartmentInputPropsType = {
  // eslint-disable-next-line no-unused-vars
  setStage: () => void;
  apartmentsArray: string[];
};

const SignupApartmentInput: React.FC<SignupApartmentInputPropsType> = ({
  setStage,
  apartmentsArray,
}) => {
  return (
    <section className="registry-step registry-step-2">
      <label htmlFor="apartment">Seleccione el apartamento:</label>
      <select name="apartment" id="apartment">
        {apartmentsArray.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <button onClick={setStage}>Next stage</button>
    </section>
  );
};

export { SignupApartmentInput };
