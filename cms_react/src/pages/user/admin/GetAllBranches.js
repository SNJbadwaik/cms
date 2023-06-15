import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../config";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'


function GetAllBranches() {
    const [allBranches, setAllBranches] = useState([])


    const fetchdata = () => {
        const token = sessionStorage.token;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.get(config.serverURL + '/admin/getallbranches')
            .then((response) => {
                setAllBranches(response.data);
            })
            .catch((e) => {
                console.log(e)
            })

    }
    const handleEditButtonClick = (id) => {
        const newBranches = [...allBranches];
        newBranches.map((item) => {
            return item.id === id ? item.isEditable = true : ""
        })
        setAllBranches(newBranches);
    }

    const handleSaveButtonClick = (idx) => {
        allBranches.map((item) => {
            // console.log(item.id, idx)
            if (item.id == idx) {
                console.log(item)
                var id = item.id;
                var branchName = item.branchName;
                var branchAddress = item.branchAddress;
                // var branchAdminid = item.branchAdmin.id;
                const token = sessionStorage.token;
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                axios.put(config.serverURL + `/admin/updatebranch`, {
                    id, branchName, branchAddress
                })
                    .then((response) => {
                        if (response.status == 200) {
                            toast.success("Branch Updated Successfully")
                            item.isEditable = false;

                            setAllBranches([...allBranches])
                        }
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        })
    }
    const handleDeleteButtonClick = (idx) => {
        console.log("delting branch with id : " + idx)
        allBranches.map((item) => {
            if (item.id == idx) {
                var idToDelete = item.id;

                const token = sessionStorage.token;
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                axios.delete(config.serverURL + `/admin/deletebranch/${idToDelete}`)
                    .then((response) => {
                        if (response.status == 200) {
                            toast.success("Branch Deleted Successfully")
                            // var newBranches = allBranches.filter((branch) => { branch.id != idx })
                            setAllBranches(allBranches.filter((branch) => branch.id != idx))
                            // setAllBranches(...allBranches)
                        }
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        })
    }

    useEffect(() => {
        fetchdata();
    }, [])

    return (<>

        <div className="container">
            <br />
            <div className="row  ">
                {/* <button className="btn btn-dark  col-auto"><Link className="text-decoration-none text-light" to='/admin/Home'>BACK</Link></button> */}
                <h2 className=" text-center">All Branches</h2></div>

            <br />
            <div className="panel">
                <div  >
                    <table className="table table-bordered table-hover table-striped">
                        <thead>

                            <tr className="text-center">
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Building</th>
                                <th scope="col">Street</th>
                                <th scope="col">Landmark</th>
                                <th scope="col">City</th>
                                <th scope="col">Pincode</th>
                                {/* <th scope="col">BranchAdmin</th> */}
                                <th scope="col">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {allBranches.map((list) => {

                                return <>{!list.isEditable ?
                                    <tr key={list.id} className="text-center">
                                        <th scope="row">{list.id}</th>
                                        <td>{list.branchName}</td>
                                        <td>{list.branchAddress.building}</td>
                                        <td>{list.branchAddress.street}</td>
                                        <td>{list.branchAddress.landmark}</td>
                                        <td>{list.branchAddress.city}</td>
                                        <td>{list.branchAddress.pincode}</td>
                                        {/* <td>{list.branchAdmin.empName}</td> */}
                                        <td>
                                            <div className="d-inline">
                                                <button className="btn mx-2 btn-sm btn-primary" onClick={() => handleEditButtonClick(list.id)}>Edit</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteButtonClick(list.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr> :
                                    <tr key={list.id} className="text-center">
                                        <th scope="row">{list.id}</th>
                                        <td><input className="form-control" type="text"
                                            onChange={(event) => {
                                                const newBranches = [...allBranches];
                                                newBranches.map((item) => {
                                                    return item.id === list.id ? item.branchName = event.target.value : ""
                                                })
                                                setAllBranches(newBranches)
                                            }} value={list.branchName} /></td>
                                        <td><input className="form-control" type="text"
                                            onChange={(event) => {
                                                const newBranches = [...allBranches];
                                                newBranches.map((item) => {
                                                    return item.id === list.id ? item.branchAddress.building = event.target.value : ""
                                                })
                                                setAllBranches(newBranches)
                                            }} value={list.branchAddress.building}></input></td>
                                        <td><input className="form-control" type="text"
                                            onChange={(event) => {
                                                const newBranches = [...allBranches];
                                                newBranches.map((item) => {
                                                    return item.id === list.id ? item.branchAddress.street = event.target.value : ""
                                                })
                                                setAllBranches(newBranches)
                                            }} value={list.branchAddress.street}></input></td>
                                        <td><input className="form-control" type="text"
                                            onChange={(event) => {
                                                const newBranches = [...allBranches];
                                                newBranches.map((item) => {
                                                    return item.id === list.id ? item.branchAddress.landmark = event.target.value : ""
                                                })
                                                setAllBranches(newBranches)
                                            }} value={list.branchAddress.landmark}></input></td>
                                        <td><input className="form-control" type="text" onChange={(event) => {
                                            const newBranches = [...allBranches];
                                            newBranches.map((item) => {
                                                return item.id === list.id ? item.branchAddress.city = event.target.value : ""
                                            })
                                            setAllBranches(newBranches)
                                        }} value={list.branchAddress.city}></input></td>
                                        <td className="col-md-1"><input className="form-control" type="text" onChange={(event) => {
                                            const newBranches = [...allBranches];
                                            newBranches.map((item) => {
                                                return item.id === list.id ? item.branchAddress.pincode = event.target.value : ""
                                            })
                                            setAllBranches(newBranches)
                                        }} value={list.branchAddress.pincode}></input></td>
                                        {/* <td>{list.branchAdmin.empName}</td> */}
                                        <td>
                                            <span> <button className="btn btn-sm mx-5 btn-info" onClick={() => handleSaveButtonClick(list.id)}>Save</button></span>
                                            {/* <span> <button className="btn  btn-primary" onClick={() => handleDeleteButtonClick(list.id)}>Delete</button></span> */}

                                        </td>

                                    </tr>
                                }</>

                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <button className="btn btn-danger"><Link className="text-decoration-none text-dark" to='/admin/Home'>BACK</Link></button>
            </div>
        </div>


    </>);
}

export default GetAllBranches;