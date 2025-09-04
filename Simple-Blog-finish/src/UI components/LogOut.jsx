import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MyContext } from "../ContextProvider/MyContext";
import { useContext } from "react";

export default function LogOut() {
  const { setUser } = useContext(MyContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.removeItem("token");
    setUser({ name: "", avatar: "" });
    navigate("/");
  };

  return <Exist onClick={handleLogout}>Log out</Exist>;
}

const Exist = styled.button`
  font-size: 18px;
  border: 1px solid rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  padding: 10px 15px;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  background-color: transparent;
  transition: all 0.4s ease;
  &:hover {
    color: white;
    background-color: rgba(245, 34, 45, 1);
  }
`;
