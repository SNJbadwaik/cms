import axios from "axios";
import config from "../../../config";
import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const GetAllOrdersToBePickedUp = () => {
  const [ordersToBePickedUpList, setOrdersToBePickedUpList] = useState([]);
  const branchId = sessionStorage.getItem("branchId");
  const token = sessionStorage.getItem("token");
  if (token != null)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  useEffect(() => {
    couriers();
  }, []);

  const couriers = () => {
    axios
      .get(config.serverURL + `/branchadmin/getallpickedupcouriers/${branchId}`) //hardcoded value
      .then((response) => {
        console.log(response);
        setOrdersToBePickedUpList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeStatus = (id) => {
    const token = sessionStorage.token;
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    axios
      .put(config.serverURL + `/branchadmin/changestatustointransit/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          var newList = ordersToBePickedUpList.filter((c) => id !== c.id);
          setOrdersToBePickedUpList(newList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="container">
      <br />
      
        <div className="text-center"><h3>Picked Up Couriers</h3></div>
      
      <br />

      <div className="panel">
        <div className="text-center">
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>courier Id</th>
                <th>Sender Address</th>
                <th>Sender Pincode</th>
                <th>Receiver Name</th>
                <th>Receiver Address</th>
                <th>Receiver Pincode</th>
                <th>Category</th>
                <th>Weight</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            {ordersToBePickedUpList.map((list) => {
              return (
                <tbody>
                  <tr>
                    <td>{list.id}</td>
                    <td>
                      {list.customer.customerAddress.building}{" "}
                      {list.customer.customerAddress.landmark}{" "}
                      {list.customer.customerAddress.city}
                    </td>
                    <td>{list.customer.customerAddress.pincode}</td>
                    <td>{list.receiver.receiverName}</td>
                    <td>
                      {list.receiver.receiverAddress.building}{" "}
                      {list.receiver.receiverAddress.landmark}{" "}
                      {list.receiver.receiverAddress.city}
                    </td>
                    <td>{list.receiver.receiverAddress.pincode}</td>
                    <td>{list.courierCategory}</td>
                    <td>{list.courierWeight}</td>
                    <td>{list.courierAmount}</td>
                    <td>
                      {list.courierStatus === "PICKED_UP" ? (
                        <button
                          className="btn btn-warning"
                          onClick={() => changeStatus(list.id)}>
                          PICKED_UP
                        </button>
                      ) : (
                        false
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
      <div>
        <button className="btn btn-primary">
          <Link
            className="text-decoration-none text-dark"
            to="/branchadmin/branchAdminHome">
            BACK
          </Link>
        </button>
      </div>
    </div>
  );
};
// const styles = {
//   button: {
//     position: "relative",
//     width: 250,
//     height: 30,
//     backgroundColor: "#db0f62",
//     color: "white",
//     borderRadius: 5,
//     border: "none",
//     marginTop: 10,
//   },
// };

export default GetAllOrdersToBePickedUp;
