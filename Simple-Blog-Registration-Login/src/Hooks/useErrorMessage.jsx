import { useState } from "react";
import { keyframes } from "styled-components";

export default function useErrorMessage() {
  const shakeKeyFrames = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

  const [serverError, setServerError] = useState("");
  const [shake, setShake] = useState(false);
  return { serverError, setServerError, shake, setShake, shakeKeyFrames };
}
