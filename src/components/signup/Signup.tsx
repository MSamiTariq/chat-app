import { useState } from "react";
import { signupFields } from "../../constants/formFields";
import FormAction from "../FormAction";
import Input from "../Input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";

const fields = signupFields;
let fieldsState: { [key: string]: string } = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const router = useRouter();
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e: any) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = () => {
    createUserWithEmailAndPassword(
      auth,
      signupState.email_address,
      signupState.password
    )
      .then((authUser) => {
        console.log("Success. The user is created in Firebase");
        console.log(authUser);
        router.push("/");
      })
      .catch((error: any) => {
        // An error occurred. Set error message to be displayed to user
        console.log(error);
      });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
