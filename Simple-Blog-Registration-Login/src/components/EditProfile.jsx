import { useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { MyContext } from "../ContextProvider/MyContext";
import useErrorMessage from "../Hooks/useErrorMessage";

export default function EditProfile() {
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
    const res = await fetch("https://realworld.habsidev.com/api/user", {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.image,
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

  return (
    <Wrapper>
      <Container>
        <H1>Edit Profile</H1>
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
            <Span>New password</Span>
            <Input
              type="password"
              placeholder="New password"
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
            <Span>Avatar image (url)</Span>
            <Input
              type="URL"
              placeholder="Avatar image"
              autoComplete="Avatar image"
              {...register("image")}
            />
          </Label>

          {serverError && <Error>{serverError}</Error>}

          <SubmitButton type="submit">Save</SubmitButton>
        </Forma>
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
  min-height: 498px;
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

const Error = styled.span`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;
