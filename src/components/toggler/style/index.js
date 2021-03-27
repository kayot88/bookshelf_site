import styled from "styled-components/macro";

const inputsBlockStyles = {
  "box-sizing": "initial",
  "box-shadow":
    "0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08),inset 0px 0px 0px 3px #9c9c9c",
};

const Wrapper = styled.div`
  margin: auto;
  min-height: 50px;
  min-width: 100px;
`;
const Input = styled.input`
  border: 0;
  /* clip: rect(0 0 0 0); */
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;
const Span = styled.span`
  ${(props) => props.toggleBtnOn && `background: #86d993`};
  box-sizing: initial;
  display: inline-block;
  outline: 0;
  width: 8em;
  height: 4em;
  position: relative;
  cursor: pointer;
  user-select: none;
  background: #fbfbfb;
  border-radius: 4em;
  padding: 4px;
  border: 2px solid #e8eae8;
  &:active {
    ${inputsBlockStyles}
  }
  &::after {
    ${inputsBlockStyles};
    left: 0;
    position: relative;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
    border-radius: 4em;
    background: #fbfbfb;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      padding 0.3s ease, margin 0.3s ease;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
  }
`;

export { Wrapper, Input, Span };
