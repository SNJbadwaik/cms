import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from "../../../config";
import { toast } from 'react-toastify'
import { useNavigate, Link } from "react-router-dom";


function GetAllEmps() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    var fetchEmployees = () => {
        const token = sessionStorage.token;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.get(config.serverURL + '/admin/getallemployees')
            .then((response) => {
                console.log(response.data)
                setEmployees(response.data)
            })
            .catch((e) => {
                console.log("error in fetching employees from server")
            })
    }
    const navigate = useNavigate();
    const handleEdit = (emp) => {
        const state = {
            id: emp.id,
            empName: emp.empName,
            empEmail: emp.empEmail,
            empPhone: emp.empPhone,
            empUsername: emp.empUsername,
            empPassword: emp.empPassword
        };
        navigate("/admin/updateemployee", { state });
    };

    const handleDelete = async (id) => {
        const token = sessionStorage.token;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.delete(config.serverURL + `/admin/deleteEmployee/${id}`)
            .then((response) => {
                console.log(response.data)
                setEmployees(employees.filter((e) => e.id !== id))
                toast.success("Employee Deleted Successfully")

            })
            .catch((e) => {
                toast.error("Something Went Wrong")
            })
    };

    return (
        <>

            <div className="container">
                <br />
                <div><h2 className="text-center">All EMPLOYEES</h2></div>

                <br />
                <div className="panel">
                    <div  >
                        <table className="table table-bordered table-hover table-striped">
                            <thead>
                                <tr>

                                    <th scope="col">Id</th>
                                    <th scope="col">EmpName</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Branch</th>
                                    <th scope="col">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((item) => {

                                    return <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.empName}</td>
                                        <td>{item.empRole}</td>
                                        <td>{item.empEmail}</td>
                                        <td>{item.empPhone}</td>
                                        <td>{item.empBranch.branchName}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)}>Edit</button>
                                            <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button className="btn btn-danger"><Link className="text-decoration-none text-dark" to='/admin/Home'>BACK</Link></button>
                </div>
            </div>


        </>
    );
}
export default GetAllEmps
