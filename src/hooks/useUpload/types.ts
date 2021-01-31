export enum actions {
  UPLOAD = "upload",
  UPLOAD_FAILED = "upload_failed",
  UPLOAD_SUCCESS = "upload_success",
}

export type State = {
  loading: boolean;
  error: string | null;
};

export type Action =
  | { type: typeof actions.UPLOAD }
  | { type: typeof actions.UPLOAD_FAILED; error: string }
  | {
      type: typeof actions.UPLOAD_SUCCESS;
    };
