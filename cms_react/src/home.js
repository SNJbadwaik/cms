import image from './images/CMS.png'
import imageLogo from './images/logo.png'

const Home=()=>{
    return <div class="px-4 text-center">
    <img class="d-block mx-auto mb-4" src={imageLogo} alt="" width="150" height="150" />
    <h3 class="display-6 fw-bold">COURIER MANAGEMENT SYSTEM</h3>
    <br/>
        <div>
                 <img src={image} width="800" height="250"></img>
        </div>
        <br/>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">The Courier Management System has following roles: Admin, Branch Admin, Delivery Boys and Customer. The system allows Admin to create branches, employees and allot couriers. 
             The customer needs to sign in to book a Courier, which needs to be picked up and delivered at specified address. 
             The system allows allotting of Couriers to the Delivery Boys working at a specific branch by branch admin. </p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
       

      </div>
    </div>
  </div>
   
}

export default Home