import { useState } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import axios from "axios";

const TrackCourier = () => {
  // get user inputs
  const [courierid, setCourierId] = useState("");
  const [courier, setCourier] = useState("");

  const [showParent, setShowParent] = useState(true);

  const track = () => {
    // check if user has really entered any value
    if (courierid.length === 0) {
      toast.error("Please Enter Courier Id");
    } else {
      // make the API call to check if user exists
      axios
        .post(config.serverURL + `/trackcourier/?c_id=${courierid}`, {})
        .then((response) => {
          const result = response.data;
          // get the data returned by server
          setCourier(response.data);

          // check if user's authentication is successfull
          if (result["status"] === "error") {
            toast.error("feedback not added");
          } else {
            setShowParent(false);
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

  return (
    <>
      {showParent ? (
        <div style={{ marginTop: 100 }}>
          <div style={styles.container}>
            <div className="mb-3">
              <label>Track Courier</label>
              <input
                onChange={(event) => {
                  setCourierId(event.target.value);
                }}
                className="form-control"
                type="text"
              />
            </div>

            <div className="mb-3" style={{ marginTop: 40 }}>
              <button onClick={track} style={styles.trackButton}>
                Track Courier
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.container}>
          <table className="table table-bordered table-hover table-striped">
            <tr>
              <td>Category </td>
              <td>{courier.courierCategory}</td>
            </tr>
            <tr>
              <td>Size </td>
              <td>{courier.courierSize}</td>
            </tr>
            <tr>
              <td>Weight </td>
              <td>{courier.courierWeight}</td>
            </tr>
            <tr>
              <td>Status </td>
              <td>{courier.courierStatus}</td>
            </tr>
            <tr>
              <td>Courier Type</td>
              <td>{courier.courierType}</td>
            </tr>
            <tr>
              <td>Courier Amount</td>
              <td>{courier.courierAmount}</td>
            </tr>
            <tr>
              <td>Payment Mode</td>
              <td>{courier.paymentMode}</td>
            </tr>
            <tr>
              <td>Order Date</td>
              <td>{courier.courierOdate}</td>
            </tr>
            <tr>
              <td>Delivery Date</td>
              <td>{courier.courierDdate}</td>
            </tr>
            <tr>
              <td>Receiver</td>
              <td>{courier.receiver.receiverName}</td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    width: 400,
    height: 300,
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    borderColor: "silver",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
  },
  trackButton: {
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
export default TrackCourier;
