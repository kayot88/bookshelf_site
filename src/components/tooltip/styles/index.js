import styled from "styled-components";
import { base, gray10, text } from "../../../styles/colors";
export const CircleButton = styled.button`
  border-radius: 30px;
  padding: 0;
  width: 40px;
  height: 40px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${base};
  color: ${text};
  border: 1px solid ${gray10};
  cursor: pointer;
`;

