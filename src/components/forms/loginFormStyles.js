import styled from "styled-components/macro";
import { Dialog as ReachDialog } from "@reach/dialog";
import * as colors from "../../styles/colors";
import * as mq from "../../styles/media-queries";

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
};
export const Button = styled.button`
  ${(props) => buttonVariants[props.variant]};
  padding: 10px 15px;
  border: 0;
  line-height: 1;
  border-radius: 3px;
`;
export const Input = styled.input`
  border-radius: 3px;
  border: 1px solid ${colors.gray10};
  background: ${colors.gray};
  padding: 8px 12px;
`;

export const CircleButton = styled.button`
  border-radius: 30px;
  padding: 0;
  width: 40px;
  height: 40px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.base};
  color: ${colors.text};
  border: 1px solid ${colors.gray10};
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

export const LoginFormWrapper = styled.div`
  border: 1px solid ${colors.gray};
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 400px;
  max-width: 450px;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  button:first-child {
    margin-right: 20px;
  }
`;
export const StyledDialog = styled(ReachDialog)`
  position: relative;

  max-width: 450px;
  border-radius: 3px;
  padding-bottom: 3.5em;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.2);
  margin: 20vh auto;

  ${mq.small} {
    width: 100%;
    margin: 10vh auto;
  }
`;
export const CloseButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
  top: 0;
  right: 0;
  border-radius: 30px;
  height: 40px;
  width: 40px;
  margin: 25px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
