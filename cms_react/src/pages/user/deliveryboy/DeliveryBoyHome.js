import { Link } from "react-router-dom"
const DeliveryBoyHome = () => {

  return (<div>
    <div className="px-4 py-5 my-5 text-center">
      {/* <img className="d-block mx-auto mb-4" alt="" width="72" height="57" /> */}
      <h3 className="display-6 fw-bold">Welcome Delivery-Boy</h3>
      <br/>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Welcome to Courier Management System Project. We hope you make the best use our services!!</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
           <br/>
   <Link to="/deliveryboy/GetAllCouriersToBePickedUpDB">
  <button type="button" className="btn btn-outline-secondary btn-lg px-4">Get All Couriers to be Picked Up</button>
   </Link>
   <Link to="/deliveryboy/GetAllCouriersToBeDeliveredDB">
   <button type="button" className="btn btn-outline-secondary btn-lg px-4">Get All Couriers to be Delivered</button>
    </Link>

          

        </div>
      </div>
    </div>
  </div>

  // return <div>Delivery Boy Home Page
  // <div>
  //    <Link to="/getAllOrdersToBePickedUpDB">
  //    <button type="button" style={styles.button}>Orders To be Picked Up</button>
  //    </Link>
  //    <br/>
  //    <Link to="/getAllOrdersToBeDeliveredDB">
  //    <button type="button" style={styles.button}>Orders To be Delivered</button>
  //    </Link>
  //    <br/>
  //    </div>
  // </div>
)}

// const styles = {

//     button: {
//       position: 'relative',
//       width: 200,
//       height: 40,
//       backgroundColor: '#db0f62',
//       color: 'white',
//       borderRadius: 5,
//       border: 'none',
//       marginTop: 10,
//     },
//   }

export default DeliveryBoyHome