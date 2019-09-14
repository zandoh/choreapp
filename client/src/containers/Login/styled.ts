import styled from "@emotion/styled";
import { Form, Field, ErrorMessage } from "formik";
import { Button, Alert } from "@chakra-ui/core";

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  min-width: 350px;
`;

export const StyledField = styled(Field)`
  display: flex;
  min-height: 42px;
  border: 1px solid ${props => props.theme["colors"]["app"]["lightGrey"]};
  margin: 1rem 0 0;
  border-radius: 8px;
  padding: 0 0.5rem;
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  margin-top: 0.5rem;
`;

export const StyledAlert = styled(Alert)`
  margin-top: 0.5rem;
`;

export const StyledButton = styled(Button)`
  color: ${props => props.theme["colors"]["white"]};
  background: ${props => props.theme["colors"]["app"]["green"]};
  border-radius: 8px;
  margin-top: 1rem;
`;
