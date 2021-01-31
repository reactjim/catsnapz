import React from "react";
import { Helmet } from "react-helmet";
import { Header, Icon, Segment } from "semantic-ui-react";

// Components
import { Upload } from "~components/upload";

export const UploadPage: React.FC = () => (
  <>
    <Helmet>
      <title>Upload image</title>
    </Helmet>
    <Segment placeholder>
      <Header icon>
        <Icon name="upload" />
        Upload your cat picture for everyone to see, yay!
      </Header>
      <Upload buttonText="Select an image to upload" />
    </Segment>
  </>
);
