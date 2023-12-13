/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

// login user function for frontend!
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });

  if (res.status !== 200) {
    throw new Error("Unable to login");
  }

  const data = await res.data;
  return data;
};
