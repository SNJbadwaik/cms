import axios from "axios";
import config from "../../../config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [empList, setEmpList] = useState([]);
  const navigate = useNavigate();

  const branchId = sessionStorage.getItem("branchId");
  const token = sessionStorage.getItem("token");
  if (token != null)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  useEffect(() => {
    getEmpList();
  }, []);

  const getEmpList = () => {
    axios
      .get(config.serverURL + `/branchadmin/allotdeliveryboy/${branchId}`) //hardcoded value
      .then((response) => {
        console.log(response);
        setEmpList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteEmp = (empid) => {
    axios
      .delete(
        config.serverURL + `/branchadmin/deleteEmployee/${empid}/${branchId}`
      )
      .then((response) => {
        console.log(response);
        const newList = empList.filter((emp) => emp.id !== empid);
        setEmpList(newList);
        toast.success(empid + "  employee deleted successfully");
      })
      .catch((error) => {
        toast.error("employee does not deleted  !");
        console.log(error);
      });
  };

  const UpdateEmp = (emp) => {
    const state = {
      id: emp.id,
      empName: emp.empName,
      empEmail: emp.empEmail,
      empPhone: emp.empPhone,
      empUsername: emp.empUsername,
      empPassword: emp.empPassword,
    };
    navigate("/branchadmin/updateemployee", { state });
  };

  return (<>
    <div className="container">
      <div className="panel">
        <br />
        <div className="text-center">
          <h3>Branch Employees List</h3>
        </div>
        <br />
        <div className="text-center">
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Action</th>
              </tr>
            </thead>
            {empList.map((emp) => {
              return (
                <tbody>
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.empName}</td>
                    <td>{emp.empUsername}</td>
                    <td>{emp.empEmail}</td>
                    <td>{emp.empPhone}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          UpdateEmp(emp);
                        }}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteEmp(emp.id);
                        }}>
                        delete
                      </button>
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
    </>
  );
};

export default EmployeeList;
