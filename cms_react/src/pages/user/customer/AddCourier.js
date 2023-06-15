import { useState } from "react";
import { toast } from "react-toastify";
import config from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourier = (props) => {
  const [courierCategory, setCourierCategory] = useState("");
  const [courierSize, setCourierSize] = useState("");
  const [courierType, setCourierType] = useState("");
  const [courierWeight, setCourierWeight] = useState("");
  var courierAmount;
  const paymentMode = "COD";
  let receiver = {
    receiverName: props.r.name,
    receiverAddress: {
      building: props.r.address.building,
      street: props.r.address.street,
      landmark: props.r.address.landmark,
      pincode: props.r.address.pincode,
      city: props.r.address.city,
    },
    receiverPhone: props.r.phone,
    receiverEmail: props.r.email,
  };

  let spin = sessionStorage.getItem("spin");
  let rpin = sessionStorage.getItem("rpin");

  //console.log(props.r);
  //console.log(props.r.name);

  const navigate = useNavigate();

  const sendCourier = (props) => {
    const id = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");

    if (token != null)
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    // check if user has really entered any value

    if (courierCategory.length === 0) {
      toast.error("please enter senders address");
    } else if (courierSize.length === 0) {
      toast.error("please enter senders Pincode");
    } else if (courierType.length === 0) {
      toast.error("please enter receivers Name");
    } else if (courierWeight.length === 0) {
      toast.error("please enter receivers Address");
    } else {
      if (courierType == "REGULAR") {

        courierAmount = courierWeight * 10;

      }
      else {
        courierAmount = courierWeight * 20;

      }
      console.log("amount is : " + courierAmount)
      axios
        .post(
          config.serverURL + `/customer/sendcourier/${spin}/${rpin}/${id}`,
          {
            receiver,
            courierCategory,
            courierSize,
            courierType,
            courierWeight,
            courierAmount,
            paymentMode,
          }
        )
        .then((response) => {
          const result = response.data;

          if (result["status"] === "error") {
            toast.error("invalid details");
          } else {
            toast.success("successfully added courier details");

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
    <div style={{ marginTop: 30 }}>
      <div style={styles.container}>
        <div className="mb-3">
          <label>Courier Category</label>
          <select
            onChange={(event) => {
              setCourierCategory(event.target.value);
            }}
            className="form-control"
          >
            <option value="">Select</option>
            <option value="DOCUMENTS">DOCUMENTS</option>
            <option value="ELECTRONICS">ELECTRONICS</option>
            <option value="FURNITURE">FURNITURE</option>
            <option value="LUGGAGES ">LUGGAGES </option>
          </select>
        </div>

        <div className="mb-3">
          <label>Courier Size</label>
          <select
            onChange={(event) => {
              setCourierSize(event.target.value);
            }}
            className="form-control"
          >
            <option value="">Select</option>
            <option value="SMALL">SMALL</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LARGE">LARGE</option>
            <option value="EXTRA_LARGE">EXTRA_LARGE</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Courier Type</label>
          <select
            onChange={(event) => {
              setCourierType(event.target.value);
            }}
            className="form-control"
          >
            <option value="">Select</option>
            <option value="REGULAR">REGULAR</option>
            <option value="URGENT">URGENT</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Courier Weight</label>
          <input
            onChange={(event) => {
              setCourierWeight(event.target.value);
            }}
            className="form-control"
            type="number"
          />
        </div>

        <div className="mb-3" style={{ marginTop: 40 }}>
          <button onClick={sendCourier} style={styles.signinButton}>
            SEND COURIER
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    height: 430,
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
    marginTop: 5,
  },
};

export default AddCourier;
