import React, { useContext, useReducer } from "react";

// helpers
import { api } from "~helpers/api";
// state
import reducer, { initialState } from "./reducer";
// contexts
import { AppContext } from "~contexts/app";
// types
import { actions, State } from "./types";

interface UploadState extends State {
  upload: (event: React.FormEvent<HTMLInputElement>) => Promise<boolean>;
}

const VALID_FILETYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 1000000; // 1mb

export const useUpload = (): UploadState => {
  const { userId } = useContext(AppContext);
  const [{ error, loading }, dispatch] = useReducer(reducer, initialState);

  const upload = async (
    event: React.FormEvent<HTMLInputElement>
  ): Promise<boolean> => {
    dispatch({ type: actions.UPLOAD });

    // does file exist?
    if (!event.currentTarget.files.length) {
      dispatch({ type: actions.UPLOAD_FAILED, error: "No file provided" });
      return;
    }

    const { files } = event.currentTarget;

    // is the file of the correct format?
    if (!VALID_FILETYPES.includes(files[0].type)) {
      dispatch({
        type: actions.UPLOAD_FAILED,
        error: "Not an allowed file type - only jpg and png allowed",
      });
      return;
    }

    // is it below the allowed file size?
    if (files[0].size >= MAX_FILE_SIZE) {
      dispatch({
        type: actions.UPLOAD_FAILED,
        error: "Image is larger than 1MB, try a smaller image",
      });
      return;
    }

    // if we get this far, we're good to go, let's attempt upload!
    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("sub_id", userId);

      const { status } = await api.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (status !== 201) throw Error();

      dispatch({ type: actions.UPLOAD_SUCCESS });
      return true;
    } catch (error) {
      dispatch({
        type: actions.UPLOAD_FAILED,
        error:
          error?.response?.data?.message ||
          "There was a problem uploading your image",
      });
      return;
    }
  };

  return {
    error,
    loading,
    upload,
  };
};
