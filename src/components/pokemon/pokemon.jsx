import React from "react";

import { Container, Table, Main } from "./style";

export function Pokemon({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}

Pokemon.Table = ({ children, ...props }) => {
  return <Table {...props}>{children}</Table>;
};
Pokemon.Main = ({ children, ...props }) => {
  return <Main {...props}>{children}</Main>;
};
