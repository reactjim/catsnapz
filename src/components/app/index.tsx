import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";

// components
import { Masthead } from "~components/masthead";
import { UploadPage } from "~pages/upload";
import { ListingPage } from "~pages/listing";
// constants
import { PATHS } from "~constants";

export const App: React.FC = () => (
  <Router>
    <Container>
      <Masthead />

      <Segment basic>
        <Switch>
          <Route path={PATHS.upload}>
            <UploadPage />
          </Route>
          <Route path={PATHS.listings}>
            <ListingPage />
          </Route>
        </Switch>
      </Segment>
    </Container>
  </Router>
);
