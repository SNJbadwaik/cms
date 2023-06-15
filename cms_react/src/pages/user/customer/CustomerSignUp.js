import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerSignup = () => {
  // get user inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaarNo, setAadhaarNo] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 
  const [customerAddress, setCustomerAddress] = useState({
    building: "",
    street: "",
    landmark: "",
    city: "",
    pincode: "",
  });

  // this function is used to navigate from one component to another programmatically
  // userNavigate() returns a function reference
  const navigate = useNavigate();

  const signup = () => {
    console.log("data is "+customerAddress.building)
    // check if user has really entered any value
    if (username.length === 0) {
      toast.error("please enter first name");
    } else if (email.length === 0) {
      toast.error("please enter email");
    } else if (password.length === 0) {
      toast.error("please enter password");
    } else if (confirmPassword.length === 0) {
      toast.error("please confirm password");
    } else if (password !== confirmPassword) {
      toast.error("password does not match");
    } else {
      // make the API call to check if user exists
      axios
        .post(config.serverURL + "/auth/signup", {
          username,
          email,
          phone,
          password,
          aadhaarNo,
          customerAddress
        })
        .then((response) => {
          // get the data returned by server
          const result = response.data;
          console.log(result);

          // check if user's authentication is successfull
          if (result["status"] === "error") {
            toast.error("invalid email or password");
          } else {
            toast.success("successfully registered a new user");

            // navigate to the singin page
            navigate("/user/signin");
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };
  return (
    <div style={{ marginTop: 50 }}>
      <div style={styles.container}>
        <div className="mb-3">
          <label>User Name</label>
          <input
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="form-control"
            type="email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="form-control"
            type="password"
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            className="form-control"
            type="password"
          />
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>
        <div className="mb-3">
          <label>Aadhaar Number</label>
          <input
            onChange={(event) => {
              setAadhaarNo(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>

        <div className="mb-3">
          <label>Address </label>
          <input
           
            onChange={(event) => {
              setCustomerAddress(
                  {
                  ...customerAddress,
                 building : event.target.value
            })
            }}
            className="form-control"
            placeholder="building"
            type="text"
          />
        </div>
        <div className="mb-3">
          <input
         
         onChange={(event) => {
          setCustomerAddress(
              {
              ...customerAddress,
             street : event.target.value
        }) 
        }}
            className="form-control"
            placeholder="street"
            type="text"
          />
        </div>
        <div className="mb-3">
          <input
            
            onChange={(event) => {
              setCustomerAddress(
                  {
                  ...customerAddress,
                 landmark : event.target.value

            }) 
            }}
            className="form-control"
            placeholder="landmark"
            type="text"
          />
        </div>

        <div className="mb-3">
          <input
         
         onChange={(event) => {
          setCustomerAddress(
              {
              ...customerAddress,
             city : event.target.value

        })   
        }}
            className="form-control"
            placeholder="city"
            type="text"
          />
        </div>

        <div className="mb-3">
          <input
          
          onChange={(event) => {
            setCustomerAddress(
                {
                ...customerAddress,
               pincode : event.target.value

          })  
          }}
            className="form-control"
            placeholder="pincode"
            type="text"
          />
        </div>

        <div className="mb-3" style={{ marginTop: 40 }}>
          <div>
            Already have an account? <Link to="/user/signin">Signin here</Link>
          </div>
          <button onClick={signup} style={styles.signinButton}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    height: 900,
    padding: 10,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    borderColor: "#db0f62",
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

export default CustomerSignup;
