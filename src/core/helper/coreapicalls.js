import { API } from "../../backend";

export const getAllProduct = () => {
  return fetch(`${API}/product`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
