import React from "react";

type SignupEmailPswInputPropsType = {};

const SignupEmailPswInput: React.FC<SignupEmailPswInputPropsType> = () => {
  return (
    <section className="registry-step registry-step-3">
      <label htmlFor="email">Introduzca su correo electrónico</label>
      <input type="text" id="email" />
      <label htmlFor="password">Introduzca una contraseña</label>
      <input type="text" id="password" />
      <label htmlFor="verify-password">Confirme su contraseña</label>
      <input type="text" id="verify-password" />
    </section>
  );
};

export { SignupEmailPswInput };
