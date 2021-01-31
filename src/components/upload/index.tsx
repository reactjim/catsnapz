import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";

// components
import { ErrorMessage } from "~components/errorMessage";
// hooks
import { useUpload } from "~hooks/useUpload";
// constants
import { PATHS } from "~constants";

interface UploadProps {
  buttonText?: string;
}

export const Upload: React.FC<UploadProps> = ({ buttonText = "Upload" }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { error, loading, upload } = useUpload();
  const history = useHistory();

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleImage = async (
    event: React.FormEvent<HTMLInputElement>
  ): Promise<void> => {
    const success = await upload(event);

    if (success) {
      history.push(PATHS.listings);
    }
  };

  return (
    <>
      {error && <ErrorMessage message={error} />}

      <Button primary onClick={handleUploadClick} loading={loading}>
        {buttonText}
      </Button>

      <input
        ref={inputRef}
        type="file"
        name="upload"
        onChange={handleImage}
        style={{ display: "none" }}
      />
    </>
  );
};
