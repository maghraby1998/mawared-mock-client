import { useMutation } from "react-query";
import { loginMutation } from "../../axios/mutations";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setToken } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import TextInput from "../../inputs/TextInput";
import "./login.css";
import ValidateAt from "../../enums/ValidateAt";
import { LinearProgress } from "@mui/material";

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
    <div className="flex items-center justify-center h-screen">
      <div className="flex-1 bg-slate-500 h-full flex items-center justify-center">
        <img src={"/src/assets/images/login-image.png"} className="h-3/5" />
      </div>
      <div className="flex align-items-center justify-center flex-1">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-[400px] m-20"
        >
          <h1 className="text-3xl capitalize font-bold text-slate-700">
            login
          </h1>
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

          <div className="w-full bg-slate-500 rounded overflow-hidden">
            <button
              disabled={loginLoading}
              className="text-xl w-full text-white capitalize p-2 cursor-pointer hover:bg-slate-400"
            >
              login
            </button>
            {loginLoading ? (
              <LinearProgress
                sx={{
                  color: "",
                  backgroundColor: "white",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "dodgerblue",
                  },
                }}
              />
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
