import { useState } from "react";
import { loginFields } from "../../constants/formFields";
import Input from "../Input";
import FormExtra from "../FormExtra";
import FormAction from "../FormAction";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";

const fields = loginFields;
let fieldsState: { [key: string]: string } = {}; // Define fieldsState with index signature
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const router = useRouter();
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {
    console.log(loginState);
    signInWithEmailAndPassword(
      auth,
      loginState.email_address,
      loginState.password
    ).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      router.push("/");
    });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
