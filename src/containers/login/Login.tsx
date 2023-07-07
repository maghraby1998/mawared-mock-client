import { useMutation } from "react-query";
import { loginMutation } from "../../axios/mutations";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setToken } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import TextInput from "../../inputs/TextInput";
import "./login.css";
import ValidateAt from "../../enums/ValidateAt";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clientErrors, setClientErrors] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const sharedProps = { isFormSubmitted, setClientErrors };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
    if (!clientErrors.length) {
      signIn({ email: form.email, password: form.password });
    }
  };

  useEffect(() => {
    return () => {
      setIsFormSubmitted(false);
      setClientErrors([]);
    };
  }, []);

  return (
    <div className="flex align-items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-[400px] m-20"
      >
        <h1 className="text-3xl capitalize font-bold">login page</h1>
        <TextInput
          label="email"
          placeholder="Email..."
          value={form.email}
          onChange={handleChange}
          name="email"
          validateAt={ValidateAt.isString}
          {...sharedProps}
        />

        <TextInput
          label="password"
          type="password"
          placeholder="Password..."
          value={form.password}
          onChange={handleChange}
          name="password"
          validateAt={ValidateAt.isString}
          {...sharedProps}
        />

        <button className="text-xl bg-slate-300 rounded p-1 cursor-pointer hover:bg-slate-400">
          {loginLoading ? "loading" : "login"}
        </button>
      </form>
    </div>
  );
}
