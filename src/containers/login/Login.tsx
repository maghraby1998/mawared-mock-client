import { useMutation } from "react-query";
import { loginMutation } from "../../axios/mutations";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setToken } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import useValidation from "../../hooks/useValidation";
import "./login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const { isValid: isEmailValid, validationMessage: emailValidationMessage } =
    useValidation({
      validateAt: "isString",
      value: form.email,
      isFormSubmitted,
    });

  const {
    isValid: isPasswordValid,
    validationMessage: passwordValidationMessage,
  } = useValidation({
    validateAt: "isString",
    value: form.password,
    isFormSubmitted,
  });

  console.log(form);

  const { mutate: signIn, isLoading: loginLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return loginMutation(email, password);
    },
    onSuccess(response) {
      let { user, access_token } = response?.data ?? {};
      dispatch(setAuth(user));
      dispatch(setToken(access_token));
      if (user?.userType?.name?.toLowerCase() === "super") {
        navigate("/super");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      window.alert(error);
    },
  });

  const handleChange = (e: any) => {
    let { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    if (isEmailValid && isPasswordValid) {
      if (form.email && form.password) {
        signIn({ email: form.email, password: form.password });
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsFormSubmitted(false);
    };
  }, []);

  return (
    <div className="flex align-items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-[400px] m-20"
      >
        <h1 className="text-3xl capitalize font-bold">login page</h1>
        <input
          type="text"
          placeholder="email"
          className={`text-xl border p-1 rounded ${
            !isEmailValid && isFormSubmitted ? "invalid-input-style" : ""
          }`}
          value={form.email}
          onChange={handleChange}
          name="email"
        />
        {isFormSubmitted && (
          <p className="error-validation-message">{emailValidationMessage}</p>
        )}

        <input
          className={`text-xl border p-1 rounded ${
            !isPasswordValid && isFormSubmitted ? "invalid-input-style" : ""
          }`}
          type="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
          name="password"
        />
        {isFormSubmitted && (
          <p className="error-validation-message">
            {passwordValidationMessage}
          </p>
        )}

        <button className="text-xl bg-slate-300 rounded p-1 cursor-pointer hover:bg-slate-400">
          {loginLoading ? "loading" : "login"}
        </button>
      </form>
    </div>
  );
}
