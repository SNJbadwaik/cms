import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../config";
import { Link } from "react-router-dom";


function GetAllCouriers() {
    const [allCouriers, setAllCouriers] = useState([])


    const fetchdata = () => {
        const token = sessionStorage.token;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.get(config.serverURL + '/admin/getallcouriers')
            .then((response) => {
                setAllCouriers(response.data);
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e)
            })

    }
    useEffect(() => {
        fetchdata();
    }, [])
    // useEffect(() => {
    // }, [allFeedBacks])
    return (<>

        <div className="container">
            <br />
            <div><h2 className="text-center">All Couriers</h2></div>

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
                                <th scope="col">DeliveryDate</th>
                                <th scope="col">Receiver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCouriers.map((list) => {

                                return <tr key={list.id}>
                                    <th scope="row">{list.id}</th>
                                    <td>{list.customer.id}</td>
                                    <td>{list.courierCategory}</td>
                                    <td>{list.courierSize}</td>
                                    <td>{list.courierWeight}</td>
                                    <td>{list.courierStatus}</td>
                                    <td>{list.courierType}</td>
                                    <td>{list.courierAmount}</td>
                                    <td>{list.paymentMode}</td>
                                    <td>{list.courierOdate}</td>
                                    <td>{list.courierDdate}</td>
                                    <td>{list.receiver.id}</td>
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

export default GetAllCouriers;