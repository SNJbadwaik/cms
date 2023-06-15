import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../config";
import { Link } from "react-router-dom";


function GetAllCouriersToBePickedUpDB() {
    const [ordersToBePickedUpList, setOrdersToBePickedUpList] = useState([]);

    const fetchdata = () => {
        const token = sessionStorage.token;
        const id = sessionStorage.id;

        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.get(config.serverURL + `/dboy/getAllOrdersToBePickedUp/${id}`)
            .then((response) => {
                setOrdersToBePickedUpList(response.data);
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e)
            })

    }
    useEffect(() => {
        fetchdata();
    }, [])

    const changeStatus = (id) => {
        const token = sessionStorage.token;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        axios
            .put(config.serverURL + `/dboy/courierpickedup/${id}`)
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


    return (<>

        <div className="container">
            <br />
            <div><h2 className="text-center">Orders To Be Picked Up</h2></div>

            <br />
            <div className="panel">
                <div  >
                    <table className="table table-bordered table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Sender</th>
                                <th scope="col">Category</th>
                                <th scope="col">Size</th>
                                <th scope="col">Weight</th>
                                <th scope="col">Status</th>
                                <th scope="col">Type</th>
                                <th scope="col">Amount</th>
                                <th scope="col">PayMode</th>
                                <th scope="col">OrderDate</th>

                                <th scope="col">Receiver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersToBePickedUpList.map((list) => {

                                return <tr key={list.id}>
                                    <th scope="row">{list.id}</th>
                                    <td>{list.customer.username}</td>
                                    <td>{list.courierCategory}</td>
                                    <td>{list.courierSize}</td>
                                    <td>{list.courierWeight}</td>
                                    <td>{list.courierStatus === "READY_FOR_PICKUP" ? (
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => changeStatus(list.id)}>
                                            READY_FOR_PICKUP
                                        </button>
                                    ) : (
                                        false
                                    )}</td>
                                    <td>{list.courierType}</td>
                                    <td>{list.courierAmount}</td>
                                    <td>{list.paymentMode}</td>
                                    <td>{list.courierOdate}</td>
                                    <td>{list.receiver.receiverName}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <button className="btn btn-danger"><Link className="text-decoration-none text-dark" to='/deliveryboy/DeliveryBoyHome'>BACK</Link></button>
            </div>
        </div>


    </>);
}

export default GetAllCouriersToBePickedUpDB;