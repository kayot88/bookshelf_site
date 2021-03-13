import styled, { keyframes } from "styled-components/macro";
import { Dialog as ReachDialog } from "@reach/dialog";
import * as colors from "../../styles/colors";
import * as mq from "../../styles/media-queries";
import { FaSpinner } from "react-icons/fa";

export function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: "4em",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  );
}

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;
export const Logout = styled.button`
  border-radius: 3px;
  border: 1px solid ${colors.gray10};
  background: ${colors.gray};
`;

export const Spinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`;
Spinner.defaultProps = {
  "aria-label": "loading",
};

export const Input = styled.input`
  border-radius: 3px;
  border: 1px solid ${colors.gray10};
  background: ${colors.gray};
  padding: 8px 12px;
  width: 100%;
`;

export const BookListUL = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 1em;
`;
