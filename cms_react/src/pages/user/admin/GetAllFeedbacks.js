import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../config";
import { Link } from "react-router-dom";


function GetAllFeedBacks() {
    const [allFeedBacks, setAllFeedBacks] = useState([])



    const changeStatus = (id) => {
        console.log("changing the status of the feedback no : " + id)
        const token = sessionStorage.token;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        axios.put(config.serverURL + `/admin/readfeedback/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    var oldstate = [...allFeedBacks];
                    oldstate.map((elem) => {
                        if (elem.id === id) {
                            console.log(elem.feedbackStatus)
                            elem.feedbackStatus = false;
                            console.log(elem.feedbackStatus)
                        }
                    })
                    setAllFeedBacks(oldstate)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const fetchdata = () => {
        const token = sessionStorage.token;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.get(config.serverURL + '/admin/feedbacks')
            .then((response) => {
                setAllFeedBacks(response.data);
                console.log(...allFeedBacks)
            })
            .catch((e) => {
                console.log(e)
            })

    }
    useEffect(() => {
        fetchdata();
    }, [])

    return (<>

        <div className="container">
            <br />
            <div><h2 className="text-center">📋 All FEEDBACKS</h2></div>

            <br />
            <div className="panel">
                <div  >
                    <table className="table table-bordered table-hover table-striped">
                        <thead>
                            <tr>

                                <th scope="col">Id</th>
                                <th scope="col">Message</th>
                                <th scope="col">Date</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {allFeedBacks.map((list) => {

                                return <tr key={list.id}>
                                    <th scope="row">{list.id}</th>
                                    <td>{list.message}</td>
                                    <td>{list.feedbackDate}</td>
                                    <td>{list.customer.username}</td>
                                    <td>{list.feedbackStatus === false ? "read already" :
                                        <button className="btn btn-info" onClick={() => changeStatus(list.id)}>NEW</button>}</td>

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


    </>);
}

export default GetAllFeedBacks;