import axios from "axios";
import config from "../../../config";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const GetAllCouriersByBranch = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [pickupBoysList, setPickupBoysList] = useState([]);
  const branchId = sessionStorage.getItem("branchId");
  const token = sessionStorage.getItem("token");
  if (token != null)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  useEffect(() => {
    couriers();
    getListOfPickupBoy();
  }, []);

  const couriers = () => {
    axios
      .get(
        config.serverURL +
          `/branchadmin/getallcouriersbyorderbranch/${branchId}`
      ) //hardcoded value
      .then((response) => {
        console.log(response);
        setOrdersList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListOfPickupBoy = () => {
    console.log(branchId);
    axios
      .get(config.serverURL + `/branchadmin/allotpickupboy/${branchId}`) //hardcoded value
      .then((response) => {
        console.log(response);
        setPickupBoysList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setPickupBoy = (pickupboyid, courierId) => {
    axios
      .put(
        config.serverURL +
          `/branchadmin/allotpickupboy/${courierId}/${pickupboyid}`
      )
      .then((response) => {
        console.log(response);
        console.log("success");
        toast.success("successfully alloted to emp Id " + pickupboyid);
        var newList = ordersList.filter((c) => c.id !== courierId);
        setOrdersList(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div>
        <h2 className="text-center">All Couriers</h2>
      </div>
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
                <th>Alot To Delivery Boy</th>
              </tr>
            </thead>
            {ordersList.map((list) => {
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
                    <td>{list.courierStatus}</td>
                  
                    {/* allot delivery boy from the delivery boy list */}
                    <td>
                      <div className="text-center" >
                        <select
                          onChange={(event) => {
                            setPickupBoy(event.target.value, list.id);
                          }}
                          style={{backgroundColor:'burlywood'}}
                          className="form-control">
                          <option className="btn btn-primary">allot</option>
                         
                          {pickupBoysList.map((list1) => {
                            return (
                              <option value={list1.id}>{list1.id}{" "}{list1.empName}</option>
                            );
                          })}
                        </select>
                      </div>
                    </td>
                  {/* ------------------------------------------------------ */}

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

const styles = {
  button: {
    position: "relative",
    width: 250,
    height: 30,
    backgroundColor: "#db0f62",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};

export default GetAllCouriersByBranch;
