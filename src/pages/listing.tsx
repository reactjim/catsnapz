import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button, Divider, Icon } from "semantic-ui-react";

// components
import { Listing } from "~components/listing";
// constants
import { PATHS } from "~constants";

export const ListingPage: React.FC = () => (
  <>
    <Helmet>
      <title>Cat listings</title>
    </Helmet>

    <Button
      as={Link}
      to={PATHS.upload}
      icon
      labelPosition="left"
      size="large"
      primary
    >
      <Icon name="upload" />
      UPLOAD
    </Button>
    <Divider horizontal />
    <Listing />
  </>
);
