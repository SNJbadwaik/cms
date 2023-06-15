import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployeeA = () => {
    // get user inputs
    const [empName, setEmpName] = useState("");
    const [empUsername, setEmpUsername] = useState("");
    const [empEmail, setEmpEmail] = useState("");
    const [empPassword, setEmpPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [empPhone, setEmpPhone] = useState("");
    const empRole = "BRANCH_ADMIN";
    const [allBranchesx, setAllBranchesx] = useState([])
    const [branchId, setBranchId] = useState('');

    useEffect(() => {
        // fetchBranches();
        const token = sessionStorage.getItem("token");
        if (token != null) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            axios.get(config.serverURL + "/admin/getallbranchnamesandid")
                .then((response) => {
                    setAllBranchesx(response.data)
                    console.log(response.data)
                }).catch((e) => {
                    toast.error("error fetching data ")
                })
        }
    }, [])
    const navigate = useNavigate();
    // const branchId = sessionStorage.getItem("branchId");
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
            console.log("now going to send the emp in branch no >" + branchId)
            axios
                .post(config.serverURL + `/admin/addemployee/${branchId}`, {
                    empName,
                    empEmail,
                    empPhone,
                    empPassword,
                    empRole,
                    empUsername
                })
                .then((response) => {
                    const result = response;
                    // console.log(result);

                    // check if employee added  successfully
                    if (result.status === 200) {
                        toast.success("Employee Added Successfully ");
                        navigate("/admin/home")
                    } else {
                        toast.error("Employee Not Added ");
                        // navigate to the singin page
                        navigate("/admin/home");
                    }
                })
                .catch((error) => {
                    console.log("error====> ");
                    console.log(error);
                });
        }
    };
    return (

        <div >
            <div style={styles.container}>
                <div><center><h2>ADD EMPLOYEE</h2></center></div>
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
                <div className="row mb-2">
                    <div className="col-md-6">
                        <label>Employee User Name</label>
                        <input
                            onChange={(event) => {
                                setEmpUsername(event.target.value);
                            }}
                            className="form-control"
                            type="text"
                        />
                    </div>


                    <div className="col-md-6">
                        <label>Branch</label>
                        <select onChange={(e) => { setBranchId(e.target.value) }} className="form-control">
                            <option value="">--Please choose branch--</option>
                            {allBranchesx.map((b) => <option key={b.id} value={b.id}>{b.branchName}</option>)}

                        </select>
                    </div>


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


                <div className="mb-3" style={{ marginTop: 10 }}>
                    <button onClick={addEmployee} style={styles.addemp}>
                        Add Employee
                    </button>
                </div>
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

export default AddEmployeeA;