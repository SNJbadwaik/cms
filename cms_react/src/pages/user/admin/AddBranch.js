import config from "../../../config";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBranch = () => {
    const navigate = useNavigate();
    const [branch, setBranch] = useState({
        branchName: "",
        branchAddress: {
            building: "",
            street: "",
            landmark: "",
            city: "",
            pincode: "",
        },
        branchAdmin: {
            empName: "",
            empRole: "BRANCH_ADMIN",
            empUsername: "",
            empPassword: "",
            empEmail: "",
            empPhone: ""
        },

    });

    const Add = () => {
        // const id = sessionStorage.getItem("id");
        const token = sessionStorage.getItem("token");
        if (token != null)
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        if (branch.branchName.length === 0) {
            console.log(branch)
            toast.error("Please enter branch name");
        }
        else if (branch.branchAddress.building.length === 0) {
            toast.error("Please enter building");
        }
        else if (branch.branchAddress.street.length === 0) {
            toast.error("Please enter street");
        }
        else if (branch.branchAddress.landmark.length === 0) {
            toast.error("Please enter landmark");
        }
        else if (branch.branchAddress.city.length === 0) {
            toast.error("Please enter city");
        }
        else if (branch.branchAddress.pincode.length === 0) {
            toast.error("Please enter pincode");
        }
        else if (branch.branchAdmin.empName.length === 0) {
            toast.error("Please enter Branch Admin name");
        }
        else if (branch.branchAdmin.empUsername.length === 0) {
            toast.error("Please enter UserName");
        }
        else if (branch.branchAdmin.empPassword.length === 0) {
            toast.error("Please enter Password");
        }
        else if (branch.branchAdmin.empEmail.length === 0) {
            toast.error("Please enter email");
        }
        else if (branch.branchAdmin.empPhone.length === 0) {
            toast.error("Please enter phone");
        }

        else {
            var branchName = branch.branchName;
            var branchAddress = branch.branchAddress
            var branchAdmin = branch.branchAdmin
            axios
                .post(
                    config.serverURL + `/admin/addbranch`,
                    {
                        branchName,
                        branchAddress,
                        // branchAdmin
                    }
                )
                .then((response) => {
                    console.log(response.data.id)
                    let empName = branchAdmin.empName
                    let empRole = branchAdmin.empRole
                    let empUsername = branchAdmin.empUsername
                    let empPassword = branchAdmin.empPassword
                    let empEmail = branchAdmin.empEmail
                    let empPhone = branchAdmin.empPhone

                    const token = sessionStorage.getItem("token");
                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                    axios.post(config.serverURL + `/admin/addemployee/${response.data.id}`, {
                        empName, empRole, empUsername, empPassword, empEmail, empPhone
                    })
                })


                .then(() => {
                    toast.success("branch added successfully...!");
                    navigate("/admin/home")
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    };

    return (
        <>
            <div >
                <div style={styles.container}>
                    <h2 className="text-center py-3">Add Branch</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label>Branch Name</label>
                                <input
                                    onChange={(event) => {
                                        setBranch({
                                            ...branch,
                                            branchName: event.target.value,
                                        });
                                    }}
                                    className="form-control"
                                    type="text"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Branch Address </label>
                                <input
                                    onChange={(event) => {
                                        setBranch({
                                            ...branch,
                                            branchAddress: {
                                                ...branch.branchAddress,
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
                                        setBranch({
                                            ...branch,
                                            branchAddress: {
                                                ...branch.branchAddress,
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
                                        setBranch({
                                            ...branch,
                                            branchAddress: {
                                                ...branch.branchAddress,
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
                                        setBranch({
                                            ...branch,
                                            branchAddress: {
                                                ...branch.branchAddress,
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
                                        setBranch({
                                            ...branch,
                                            branchAddress: {
                                                ...branch.branchAddress,
                                                pincode: event.target.value,
                                            },
                                        });
                                    }}
                                    className="form-control"
                                    placeholder="pincode"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label>BranchAdmin Name</label>
                                <input
                                    onChange={(event) => {
                                        setBranch({
                                            ...branch,
                                            branchAdmin: {
                                                ...branch.branchAdmin,
                                                empName: event.target.value,
                                            }
                                        });
                                    }}
                                    className="form-control"
                                    type="text"
                                />
                            </div>
                            <div className="mb-3">
                                <label>BranchAdmin Email</label>
                                <input
                                    onChange={(event) => {
                                        setBranch({
                                            ...branch,
                                            branchAdmin: {
                                                ...branch.branchAdmin,
                                                empEmail: event.target.value,
                                            }
                                        });
                                    }}
                                    className="form-control"
                                    type="email"
                                />
                            </div>
                            <div className="mb-3">
                                <label>BranchAdmin UserName</label>
                                <input
                                    onChange={(event) => {
                                        setBranch({
                                            ...branch,
                                            branchAdmin: {
                                                ...branch.branchAdmin,
                                                empUsername: event.target.value,
                                            }
                                        });
                                    }}
                                    className="form-control"
                                    type="email"
                                />
                            </div>
                            <div className="mb-3">
                                <label>BranchAdmin Password</label>
                                <input
                                    onChange={(event) => {
                                        setBranch({
                                            ...branch,
                                            branchAdmin: {
                                                ...branch.branchAdmin,
                                                empPassword: event.target.value,
                                            }
                                        });
                                    }}
                                    className="form-control"
                                    type="email"
                                />
                            </div>
                            <div className="mb-3">
                                <label>BranchAdmin Phone</label>
                                <input
                                    onChange={(event) => {
                                        setBranch({
                                            ...branch,
                                            branchAdmin: {
                                                ...branch.branchAdmin,
                                                empPhone: event.target.value,
                                            }
                                        });
                                    }}
                                    className="form-control"
                                    type="email"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3" style={{ marginTop: 20 }}>
                        <button onClick={Add} style={styles.signinButton}>
                            ADD branch
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};
const styles = {
    container: {
        width: 800,
        height: 600,
        padding: 10,
        position: "relative",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
        borderColor: "grey",
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
export default AddBranch;
