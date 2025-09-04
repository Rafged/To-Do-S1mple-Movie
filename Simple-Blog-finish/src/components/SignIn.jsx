import { Link, useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";
import { useForm } from "react-hook-form";
import { MyContext } from "../ContextProvider/MyContext";
import { useContext } from "react";
import useErrorMessage from "../Hooks/useErrorMessage";

import React from "react";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const { serverError, setServerError, shake, setShake, shakeKeyFrames } =
    useErrorMessage();

  const onSubmit = async (data) => {
    const res = await fetch("https://realworld.habsidev.com/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem("username", result.user.username);
      localStorage.setItem("avatar", result.user.image);
      localStorage.setItem("token", result.user.token);
      setUser({
        name: result.user.username,
        avatar: result.user.image,
      });
      navigate("/articles");
    } else {
      if (result.errors && result.errors.body) {
        setServerError("Account not found");
      } else {
        setServerError("Something went wrong");
      }
      setShake(true);
    }
  };

  return (
    <Wrapper>
      <Container>
        <H1>Sign In</H1>
        <Forma
          onSubmit={handleSubmit(onSubmit, () => {
            setShake(true);
            setTimeout(() => setShake(false), 400);
          })}
          $shake={shake}
          $shakeKeyFrames={shakeKeyFrames}
        >
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
              $error={!!errors.email}
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
              $error={!!errors.password}
            />
            {errors.password && <Error>{errors.password.message}</Error>}
          </Label>
          {serverError && <Error>{serverError}</Error>}
          <SubmitButton>Login</SubmitButton>
        </Forma>
        <TextSignIn>
          Don’t have an account?
          <Link to={"/sign-up"} style={{ color: "rgba(24, 144, 255, 1)" }}>
            Sign Up
          </Link>
          .
        </TextSignIn>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px auto;
  width: 384px;
  min-height: 374px;
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
