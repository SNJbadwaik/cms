import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  // get user inputs
  const [empName, setEmpName] = useState("");
  const [empUsername, setEmpUsername] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empPassword, setEmpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [empPhone, setEmpPhone] = useState("");
  const empRole = "DELIVERY_BOY";

  // this function is used to navigate from one component to another programmatically
  // userNavigate() returns a function reference
  const navigate = useNavigate();
  const branchId = sessionStorage.getItem("branchId");
  const token = sessionStorage.getItem("token");
  if (token != null)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const addEmployee = () => {
    // check if user has really entered any value
    if (empName.length === 0) {
      toast.error("please enter name");
    } else if (empEmail.length === 0) {
      toast.error("please enter email");
    } else if (empPassword.length === 0) {
      toast.error("please enter password");
    } else if (confirmPassword.length === 0) {
      toast.error("please confirm password");
    } else if (empPassword !== confirmPassword) {
      toast.error("password does not match");
    } else {
      // make the API call to check if user exists
      axios
        .post(config.serverURL + `/branchadmin/addemployee/${branchId}`, {
          empName,
          empEmail,
          empPhone,
          empPassword,
          empRole,
          empUsername,
        })
        .then((response) => {
          // get the data returned by server
          const result = response;
          console.log(result);
          // check if employee added  successfully
          if (result.status === 200) {
            toast.success("successfully registered a new user");
            // navigate to the singin page
            navigate("/branchadmin/employeelist");
          } else {
            toast.error("employee does not added successfully");
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
        <div className="text-center">
          <h3>
            <b>Add Employee</b>
          </h3>
        </div>
        <div className="mb-3">
          <label>Employee Name</label>
          <input
            onChange={(event) => {
              setEmpName(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>
        <div className="mb-3">
          <label>Employee User Name</label>
          <input
            onChange={(event) => {
              setEmpUsername(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>

        <div className="mb-3">
          <label>Employee Email</label>
          <input
            onChange={(event) => {
              setEmpEmail(event.target.value);
            }}
            className="form-control"
            type="email"
          />
        </div>
        <div className="mb-3">
          <label>Employee Password</label>
          <input
            onChange={(event) => {
              setEmpPassword(event.target.value);
            }}
            className="form-control"
            type="password"
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            className="form-control"
            type="password"
          />
        </div>
        <div className="mb-3">
          <label>Employee Phone Number</label>
          <input
            onChange={(event) => {
              setEmpPhone(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>

        <div className="mb-3" style={{ marginTop: 40 }}>
          <button onClick={addEmployee} style={styles.addemp}>
            Add Employee
          </button>
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
  container: {
    width: 600,
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
  addemp: {
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

export default AddEmployee;
