import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCourier from "./AddCourier";

const AddReceiver = () => {
  const [showParent, setShowParent] = useState(true);

  const [receiver, setReceiver] = useState({
    name: "",
    address: {
      building: "",
      street: "",
      landmark: "",
      pincode: "",
      city: "",
    },
    phone: "",
    email: "",
  });

  const navigate = useNavigate();

  const Add = () => {
    const id = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");
    if (token != null)
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    if (receiver.name.length === 0) {
      toast.error("Please enter receivers name");
    } else if (receiver.address.building.length === 0) {
      toast.error("Please enter receivers address");
    } else if (receiver.phone.length === 0) {
      toast.error("Please enter receivers Phone No.");
    } else if (receiver.email.length === 0) {
      toast.error("Please enter receivers e-mail");
    } else {
      setShowParent(false);
    }
  };

  return (
    <>
      {showParent ? (
        <div style={{ marginTop: 50 }}>
          <div style={styles.container}>
            <div className="mb-3">
              <label>Receiver Name</label>
              <input
                onChange={(event) => {
                  setReceiver({
                    ...receiver,
                    name: event.target.value,
                  });
                }}
                className="form-control"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label>Receiver Address </label>
              <input
                onChange={(event) => {
                  setReceiver({
                    ...receiver,
                    address: {
                      ...receiver.address,
                      building: event.target.value,
                    },
                  });
                }}
                className="form-control"
                placeholder="building"
                type="text"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={(event) => {
                  setReceiver({
                    ...receiver,
                    address: {
                      ...receiver.address,
                      street: event.target.value,
                    },
                  });
                }}
                className="form-control"
                placeholder="street"
                type="text"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={(event) => {
                  setReceiver({
                    ...receiver,
                    address: {
                      ...receiver.address,
                      landmark: event.target.value,
                    },
                  });
                }}
                className="form-control"
                placeholder="landmark"
                type="text"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={(event) => {
                  setReceiver({
                    ...receiver,
                    address: {
                      ...receiver.address,
                      city: event.target.value,
                    },
                  });
                }}
                className="form-control"
                placeholder="city"
                type="text"
              />
            </div>
            <div className="mb-3">
              <input
                onChange={(event) => {
                  setReceiver({
                    ...receiver,
                    address: {
                      ...receiver.address,
                      pincode: event.target.value,
                    },
                  });
                }}
                className="form-control"
                placeholder="pincode"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label>Receiver Phone no.</label>
              <input
                onChange={(event) => {
                  setReceiver({
                    ...receiver,
                    phone: event.target.value,
                  });
                }}
                className="form-control"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label>Receiver Email</label>
              <input
                onChange={(event) => {
                  setReceiver({
                    ...receiver,
                    email: event.target.value,
                  });
                }}
                className="form-control"
                type="email"
              />
            </div>
            <div className="mb-3" style={{ marginTop: 20 }}>
              <button onClick={Add} style={styles.signinButton}>
                ADD RECEIVER
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AddCourier r={receiver} />
      )}
    </>
  );
};
const styles = {
  container: {
    width: 400,
    height: 600,
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
export default AddReceiver;
