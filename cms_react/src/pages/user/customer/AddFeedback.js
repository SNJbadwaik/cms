import { useState } from "react";
import { toast } from "react-toastify";
import config from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFeedback = () => {
  // get user inputs
  const [message, setMessage] = useState("");

  const id = sessionStorage.getItem("id");
  //set token from session storage
  const token = sessionStorage.getItem("token");
  //to set default header in axios
  if (token != null)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const navigate = useNavigate();

  const feedback = () => {
    // check if user has really entered any value
    if (message.length === 0) {
      toast.error("please give us feedback");
    } else {
      // make the API call to check if user exists
      axios
        .post(config.serverURL + `/customer/feedback/${id}`, {
          message,
        })
        .then((response) => {
          // get the data returned by server
          const result = response.data;

          // check if user's authentication is successfull
          if (result["status"] === "error") {
            toast.error("feedback not added");
          } else {
            toast.success("successfully added feedback,thank you!!");

            // navigate to the singin page
            navigate("/customerHome");
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

  return (
    <div style={{ marginTop: 100 }}>
      <div style={styles.container}>
        <div className="mb-3">
          <label>Feedback</label>
          <input
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>

        <div className="mb-3" style={{ marginTop: 40 }}>
          <button onClick={feedback} style={styles.feedbackButton}>
            Give Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    height: 200,
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    borderColor: "#db0f62",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
  },
  feedbackButton: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "#db0f62",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};

export default AddFeedback;
