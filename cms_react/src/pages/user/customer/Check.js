import { useState } from "react";
import { toast } from "react-toastify";
import config from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Check = () => {
  const [sendersPincode, setSendersPincode] = useState("");
  const [receiversPincode, setReceiversPincode] = useState("");

  const navigate = useNavigate();

  const CheckAvailability = () => {
    const id = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");
    if (token != null)
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    if (sendersPincode.length === 0) {
      toast.error("Please enter senders pincode");
    } else if (receiversPincode.length === 0) {
      toast.error("Please enter receivers pincode");
    } else {
      axios
        .get(
          config.serverURL +
            `/customer/check/${sendersPincode}/${receiversPincode}`,
          {
            // sendersPincode,
            // receiversPincode
          }
        )
        .then((response) => {
          const result = response.data;

          if (result["spin"] === false) {
            toast.error("Not available at senders pincode");
          } else if (result["rpin"] === false) {
            toast.error("Not available at receivers pincode");
          } else {
            sessionStorage.setItem("spin", sendersPincode);
            sessionStorage.setItem("rpin", receiversPincode);
            navigate("/customer/addreceiver");
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

  return (
    <div style={{ marginTop: 50 }}>
      <div style={styles.container}>
        <div className="mb-3">
          <label>Sender Pincode</label>
          <input
            onChange={(event) => {
              setSendersPincode(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>
        <div className="mb-3">
          <label>Receiver Pincode</label>
          <input
            onChange={(event) => {
              setReceiversPincode(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>
        <div className="mb-3" style={{ marginTop: 40 }}>
          <button onClick={CheckAvailability} style={styles.signinButton}>
            NEXT
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
    padding: 10,
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
  signinButton: {
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

export default Check;
