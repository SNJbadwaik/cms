import { Link } from "react-router-dom";
// import imageLogo from "../../../image/logo.png";
const BranchAdminHome = () => {
  return (
    <div>
      <div className="px-4 py-5 my-5 text-center">
        {/* <img
          className="d-block mx-auto mb-4"
          //   src={imageLogo}
          alt=""
          width="72"
          height="57"
        /> */}
        <h3 className="display-6 fw-bold">⚜ Welcome Branch Admin ⚜</h3>
        <br />
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Welcome to Courier Management System Project. We hope you make the
            best use our services!!
          </p>
          <br />
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/branchadmin/getallnewordersbybranch">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4">
                New Couriers
              </button>
            </Link>
            <Link to="/branchadmin/getAllOrdersToBePickedUp">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4">
                Picked_Up Couriers
              </button>
            </Link>
            <Link to="/branchadmin/getAllOrdersToBeDelivered">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4">
                Couriers_To_Be Delivered
              </button>
            </Link>
            <Link to="/branchadmin/getallcourierbybranch">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4">
                All Couriers
              </button>
            </Link>
            <Link to="/branchadmin/addemployee">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4">
                Add Employee
              </button>
            </Link>
            <Link to="/branchadmin/employeelist">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4">
                All_Branch Employee
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

 
};

export default BranchAdminHome;
