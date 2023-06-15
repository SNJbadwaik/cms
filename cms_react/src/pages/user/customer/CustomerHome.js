import { Link } from "react-router-dom";

const CustomerHome = () => {
  return (
    <div>
      <div className="px-4 py-5 my-5 text-center">
        {/* <img className="d-block mx-auto mb-4" src={imageLogo} alt="" width="72" height="57" /> */}
        <h3 className="display-6 fw-bold">Welcome Customer</h3>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Welcome to Courier Management System. We hope you make the best use
            our services!!
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/customer/feedback">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Add Feedback
              </button>
            </Link>

            <Link to="/customer/getAllCourier">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Get My Couriers
              </button>
            </Link>

            <Link to="/customer/check">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Book a Courier
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
