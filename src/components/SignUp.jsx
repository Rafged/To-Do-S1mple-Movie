import { Link, useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { MyContext } from "../ContextProvider/MyContext";
import useErrorMessage from "../Hooks/useErrorMessage";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const { serverError, setServerError, shake, setShake, shakeKeyFrames } =
    useErrorMessage();

  const onSubmit = async (data) => {
    const res = await fetch("https://realworld.habsidev.com/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }),
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem("username", result.user.username);
      localStorage.setItem("token", result.user.token);
      setUser({
        name: result.user.username,
        avatar: result.user.image,
      });
      navigate("/articles");
    } else {
      if (
        result.errors &&
        result.errors.body.includes(
          "SQLiteError: UNIQUE constraint failed: users.username"
        )
      ) {
        setServerError("Username is already taken");
      } else if (
        result.errors &&
        result.errors.body.includes(
          "SQLiteError: UNIQUE constraint failed: users.email"
        )
      ) {
        setServerError("Email is already taken");
      } else {
        setServerError("Something went wrong");
      }
      setShake(true);
    }
  };

  const password = watch("password");
  return (
    <Wrapper>
      <Container>
        <H1>Create new account</H1>
        <Forma
          onSubmit={handleSubmit(onSubmit, () => {
            setShake(true);
            setTimeout(() => setShake(false), 400);
          })}
          $shake={shake}
          $shakeKeyFrames={shakeKeyFrames}
        >
          <Label>
            <Span>Username</Span>
            <Input
              placeholder="Username"
              required
              autoComplete="username"
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Min 3 characters" },
                maxLength: { value: 20, message: "Max 20 characters" },
              })}
              $error={!!errors.username}
            />
            {errors.username && <Error>{errors.username.message}</Error>}
          </Label>
          <Label>
            <Span>Email address</Span>
            <Input
              type="email"
              placeholder="Email address"
              autoComplete="email"
              required
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              $error={!!errors.username}
            />
            {errors.email && <Error>{errors.email.message}</Error>}
          </Label>
          <Label>
            <Span>Password</Span>
            <Input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              required
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Your password needs to be at least 6 characters.",
                },
                maxLength: {
                  value: 40,
                  message: "Your password needs to be less than 40 characters",
                },
              })}
              $error={!!errors.username}
            />
            {errors.password && <Error>{errors.password.message}</Error>}
          </Label>
          <Label>
            <Span>Repeat Password</Span>
            <Input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              required
              {...register("repeatPassword", {
                required: "Repeat your password",
                validate: (value) =>
                  value === password || "Passwords must match",
              })}
              $error={!!errors.username}
            />
            {errors.repeatPassword && (
              <Error>{errors.repeatPassword.message}</Error>
            )}
          </Label>
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              {...register("agreement", { required: true })}
            />
            <CheckboxSpan>
              I agree to the processing of my personal information
            </CheckboxSpan>
          </CheckboxWrapper>
          {errors.agreement && <Error>You must agree before submitting</Error>}
          {serverError && <Error>{serverError}</Error>}

          <SubmitButton type="submit">Create</SubmitButton>
        </Forma>

        <TextSignIn>
          Already have an account?
          <Link to={"/sign-in"} style={{ color: "rgba(24, 144, 255, 1)" }}>
            Sign In
          </Link>
          .
        </TextSignIn>
      </Container>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px auto;
  width: 384px;
  min-height: 600px;
  background: white;
  border-radius: 6px;
  box-shadow: 0px 0.5px 5px rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  padding: 48px 32px;
`;

const H1 = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 21px;
  font-family: "Roboto";
`;

const Forma = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 8px;
  ${(props) =>
    props.$shake &&
    css`
      animation: ${props.$shakeKeyFrames} 0.4s ease;
    `}
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2px;
`;
const Span = styled.span`
  font-size: 16px;
  font-family: "Roboto";
  color: rgba(38, 38, 38, 1);
`;
const Input = styled.input`
  font-size: 16px;
  width: 320px;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid
    ${(props) => (props.$error ? "red" : "rgba(232, 232, 232, 1)")};
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;
const CheckboxWrapper = styled.label`
  font-family: "Roboto";
  display: flex;
  align-items: flex-start;
  margin-top: 9px;
  padding-top: 8px;
  border-top: 1px solid rgba(232, 232, 232, 1);
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin-top: 2px;
`;

const CheckboxSpan = styled.span`
  color: rgba(89, 89, 89, 1);
  width: 278px;
`;

const SubmitButton = styled.button`
  text-align: center;
  height: 40px;
  background-color: rgba(24, 144, 255, 1);
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-family: "Roboto";
  margin-top: 9px;
  border: none;
  cursor: pointer;
  &:active {
    transform: translateY(2px);
  }
`;

const TextSignIn = styled.span`
  color: rgba(140, 140, 140, 1);
`;

const Error = styled.span`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;
