import { useReducer, useEffect } from "react";

const asyncGetReq = async () => {};
const asyncPutReq = async () => {};
const asyncPostReq = async () => {};
const asyncDeleteReq = async () => {};

type State =
  | {
      status: "pending";
      data: null;
      error: null;
    }
  | {
      status: "idle";
      data: null;
      error: null;
    };

type Action =
  | { type: "pending" }
  | { type: "resolved"; data: any }
  | { type: "rejected"; error: Error };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "pending": {
      return {
        status: "pending",
        data: null,
        error: null,
      };
    }
  }
};

const useFetch = (
  url: string,
  type: string,
  asyncReq?: () => Promise<void>
) => {
  const [{ status, data, error }, dispatch] = useReducer(reducer, {
    status: "idle",
    data: null,
    error: null,
  });

  useEffect(() => {
    let isCanceled = false;
    return () => {
      isCanceled = true;
      if (type === "GET") {
        asyncGetReq();
      }
      if (type === "PUT") {
        asyncPutReq();
      }
      if (type === "POST") {
        asyncPostReq();
      }
      if (type === "DELETE") {
        asyncDeleteReq();
      }
    };
  }, [url, type]);

  return {
    idle: status === "idle",
    resolved: status === "resolved",
    rejected: status === "rejected",
    data,
    error,
  };
};

export default useFetch;
