import { Link } from "react-router-dom";

function AdminHome() {
    return (
        <div>
            <div className="px-4 py-5 my-5 text-center">
                {/* <img className="d-block mx-auto mb-4" src={imageLogo} alt="" width="72" height="57" /> */}
                <h3 className="display-6 fw-bold text-underline" >⚜ Welcome Admin ⚜</h3>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Welcome to Courier Management System Project. We hope you make the best use our services!!</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">

                        <Link to="/admin/addemployee">
                            <button type="button" className="btn btn-outline-dark btn-lg px-4">Add Employee</button>
                        </Link>
                        <Link to="/admin/addBranch">
                            <button type="button" className="btn btn-outline-dark btn-lg px-4">Add Branch</button>
                        </Link>
                        <Link to="/admin/getallbranches">
                            <button type="button" className="btn btn-outline-dark btn-lg px-4">Get All Branches</button>
                        </Link>
                        <Link to="/admin/getallfeedbacks">
                            <button type="button" className="btn btn-outline-dark btn-lg px-4">Get All Feedbacks</button>
                        </Link>
                        <Link to="/admin/getallcouriers">
                            <button type="button" className="btn btn-outline-dark btn-lg px-4">Get All Couriers</button>
                        </Link>
                        <Link to="/admin/getallemployees">
                            <button type="button" className="btn btn-outline-dark btn-lg px-4">Get All Employees</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;