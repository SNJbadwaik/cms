import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import config from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateEmployee = () => {
  // get user inputs
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [empUsername, setEmpUsername] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empPhone, setEmpPhone] = useState("");
  const [empPassword, setEmpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const empRole = "DELIVERY_BOY";

  // //-----geting state from previous components-----
  const location = useLocation();
  useEffect(() => {
    const myEmp = location.state;
    const empid = myEmp.id;
    setEmpId(myEmp.id);
    setEmpName(myEmp.empName);
    setEmpUsername(myEmp.empUsername);
    setEmpEmail(myEmp.empEmail);
    setEmpPhone(myEmp.empPhone);
    setEmpPassword(myEmp.empPassword);
    setConfirmPassword(myEmp.empPassword);
  }, []);

  const navigate = useNavigate();
  const branchId = sessionStorage.getItem("branchId");
  const token = sessionStorage.getItem("token");
  if (token != null)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const editEmp = (empid) => {
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
        .post(config.serverURL + `/branchadmin/updateemployee/${empid}`, {
          empName,
          empEmail,
          empPhone,
          empPassword,
          empUsername,
        })
        .then((response) => {
          // get the data returned by server
          const result = response;
          console.log(response);

          // check if employee added  successfully
          if (result.status == 200) {
            toast.success("Employee Updated Successfully");
            navigate("/branchadmin/employeelist");
          } else {
            toast.error("employee does not added successfully");
            // navigate to the singin page
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
      <br></br>
      <div style={styles.container}>
        <div>
          <center>
            <h3>
              <b>Update Employee</b>
            </h3>
          </center>
        </div>
        <div className="mb-3">
          <label>Employee Id</label>
          <input
            onChange={(event) => {
              setEmpId(event.target.value);
            }}
            className="form-control"
            type="text"
            value={empId}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Employee Name</label>
          <input
            onChange={(event) => {
              setEmpName(event.target.value);
            }}
            className="form-control"
            type="text"
            value={empName}
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
            value={empUsername}
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
            value={empEmail}
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
            // value={empPassword}
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
            // value={empPassword}
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
            value={empPhone}
          />
        </div>

        <div className="mb-3" style={{ marginTop: 40 }}>
          <button onClick={() => editEmp(empId)} style={styles.addemp}>
            Update Employee
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 600,
    height: 700,
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
    marginTop: 0,
  },
};

export default UpdateEmployee;
