import React from "react";
import { Icon, Message } from "semantic-ui-react";

interface ErrorMessageProps {
  icon?: boolean;
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  icon,
  message,
}) => (
  <Message icon={icon} negative>
    {icon && <Icon name="exclamation triangle" />}
    <Message.Header>{message}</Message.Header>
  </Message>
);
