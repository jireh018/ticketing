import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      /*console.log("Errors", err);
      const errorResponse = err.response;
      const errorData = errorResponse ? errorResponse.data : null;
      const errorMessages =
        errorData && errorData.errors
          ? errorData.errors
          : [{ message: "An unexpected error occurred." }];*/

      setErrors(
        <div className="alert alert-danger">
          <h4>Oooopss...</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
