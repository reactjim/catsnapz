import React from "react";
import { Link } from "react-router-dom";
import { Header, Icon, Segment } from "semantic-ui-react";

// constants
import { PATHS } from "~constants";

export const Masthead: React.FC = () => (
  <Segment basic>
    <Link to={PATHS.listings}>
      <Header as="h1">
        <Icon name="paw" />
        <Header.Content>
          Cat Snapz
          <Header.Subheader>Your daily dose of catness</Header.Subheader>
        </Header.Content>
      </Header>
    </Link>
  </Segment>
);
