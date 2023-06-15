import React, {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import GetAllEmps from "./pages/user/admin/GetAllEmps"
import AddBranch from "./pages/user/admin/AddBranch";
import AddEmployeeA from "./pages/user/admin/AddEmp";
import Navbar from "./components/navbar";
import Footer from "./components/footerComponent";

//sigin-signup
import Signin from "./pages/user/signin";
import Signout from "./pages/user/Signout";

import AdminHome from "./pages/user/admin/AdminHome";
import GetAllEmps from "./pages/user/admin/GetAllEmps";
import GetAllBranches from "./pages/user/admin/GetAllBranches";
import GetAllCouriers from "./pages/user/admin/GetAllCouriers";
import GetAllFeedbacks from "./pages/user/admin/GetAllFeedbacks";
import UpdateEmployeeA from "./pages/user/admin/UpdateEmp";


//customer
import CustomerSignup from "./pages/user/customer/CustomerSignUp";
import CustomerHome from "./pages/user/customer/CustomerHome";
import AddCourier from "./pages/user/customer/AddCourier";
import Check from "./pages/user/customer/Check";
import AddReceiver from "./pages/user/customer/AddReceiver";
import AddFeedback from "./pages/user/customer/AddFeedback";
import GetAllCustomerCouriers from "./pages/user/customer/GetAllCustomerCouriers";

//branch admin
import BranchAdminHome from "./pages/user/branchadmin/BranchAdminHome";
import GetAllOrdersToBePickedUp from "./pages/user/branchadmin/getAllOrdersToBePickedUp";
import GetAllOrdersToBeDelivered from "./pages/user/branchadmin/GetAllOrdersToBeDelivered";
import AddEmployeeBA from "./pages/user/branchadmin/AddEmployee";
import EmployeeList from "./pages/user/branchadmin/EmployeeList";
import GetAllCouriersBA from "./pages/user/branchadmin/GetAllCouriersBA";
import UpdateEmployee from "./pages/user/branchadmin/UpdateEmployee";
import GetAllCouriersByBranch from "./pages/user/branchadmin/GetAllCouriersByBranch";
import AddEmployee from "./pages/user/branchadmin/AddEmployee";

//delvery boy
import DeliveryBoyHome from "./pages/user/deliveryboy/DeliveryBoyHome";
import GetAllCouriersToBePickedUpDB from "./pages/user/deliveryboy/GetAllCouriersToBePickedUpDB";
import GetAllCouriersToBeDeliveredDB from "./pages/user/deliveryboy/GetAllCouriersToBeDeliveredDB";

import Home from "./home";
import TrackCourier from "./pages/user/TrackCourier";
import Aboutus from "./Aboutus";


function App() {
  
  const [isLoggedIn, setIsloggedIn] = useState(false);
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn } />
        {/* <hr style={styles.hrstyle} /> */}
        <Routes>
          <Route path="/pages/home" element={<Home />} />
          <Route path="/" element={<Home />} />

          {/* About us */}
          <Route path="/Aboutus" element={<Aboutus />} />

          {/* home */}
          <Route path="/pages/home" element={<Home />} />
          <Route path="/" element={<Home />} />

          {/* signin and signout */}
          <Route path="/user/signin" element={<Signin setIsloggedIn={setIsloggedIn} />} />
          <Route path="/signout" element={<Signout setIsloggedIn={setIsloggedIn}/>} />
          <Route path="/trackCourier" element={<TrackCourier />} />

          {/* //ADMIN */}
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/getallbranches" element={<GetAllBranches />} />
          <Route path="/admin/getallcouriers" element={<GetAllCouriers />} />
          <Route path="/admin/getallfeedbacks" element={<GetAllFeedbacks />} />
          <Route path="/admin/getallemployees" element={<GetAllEmps />} />
          <Route path="/admin/addBranch" element={<AddBranch />} />
          <Route path="/admin/addemployee" element={<AddEmployeeA />} />
          <Route path="/admin/updateemployee" element={<UpdateEmployeeA />} />
          <Route
            path="/branchadmin/branchAdminHome"
            element={<BranchAdminHome />}
          />
          <Route
            path="/branchadmin/getAllOrdersToBePickedUp"
            element={<GetAllOrdersToBePickedUp />}
          />
          <Route
            path="/branchadmin/getAllOrdersToBeDelivered"
            element={<GetAllOrdersToBeDelivered />}
          />
          <Route path="/admin/addemployee" element={<AddEmployee/>} />
          {/* </Routes > */}

          {/* branch admin */}
          <Route path="/branchadmin/branchAdminHome" element={<BranchAdminHome />} />
          <Route path="/branchadmin/getAllOrdersToBePickedUp" element={<GetAllOrdersToBePickedUp />} />
          <Route path="/branchadmin/getAllOrdersToBeDelivered" element={<GetAllOrdersToBeDelivered />} />
          <Route path="/branchadmin/addemployee" element={<AddEmployeeBA />} />
          <Route path="/branchadmin/employeelist" element={<EmployeeList />} />
          <Route
            path="/branchadmin/getallcourierbybranch"
            element={<GetAllCouriersBA />}
          />
          <Route
            path="/branchadmin/updateemployee"
            element={<UpdateEmployee />}
          />
          <Route
            path="/branchadmin/getallnewordersbybranch"
            element={<GetAllCouriersByBranch />}
          />


          {/* customer */}

          <Route
            path="/user/customer/CustomerSignup"
            element={<CustomerSignup />}
          />
          <Route path="/customerHome" element={<CustomerHome />} />
          <Route path="/customer/addCourier" element={<AddCourier />} />
          <Route path="/customer/check" element={<Check />} />
          <Route path="/customer/addreceiver" element={<AddReceiver />} />
          <Route path="/customer/feedback" element={<AddFeedback />} />
          <Route path="/customer/getAllCourier" element={<GetAllCustomerCouriers />} />

          {/* delivery boy */}
          <Route path="/deliveryboy/DeliveryBoyHome"  element={<DeliveryBoyHome />} />
          <Route path="deliveryboy/getAllCouriersToBePickedUpDB" element={<GetAllCouriersToBePickedUpDB />}/>
          <Route path="deliveryboy/GetAllCouriersToBeDeliveredDB" element={<GetAllCouriersToBeDeliveredDB />}/>
        </Routes>

        <Footer/>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  );
}
const styles = {
  hrstyle: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000000",
  },
};
export default App;
