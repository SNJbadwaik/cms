//import image from './images/CMS.jpg'
import imageLogo from './images/logo.png'
import sagar from './images/sagar.jpg'
import shirish from './images/shirish.jfif'
import ashish from './images/ashish.jfif'
import sanjay from './images/sanjay.jfif'

const Aboutus=()=>{
    return <div class="px-4  text-center">
    <img class="d-block mx-auto mb-4" src={imageLogo} alt="" width="150" height="150" />
    <h3 class="display-6 fw-bold">ABOUT US</h3>
    <br/>
        <div>
                 {/* <img src={image} width="1000" height="250"></img> */}
        </div>
        <br/>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">Welcome To Courier Management System Project.This Project Has been Made by </p>
      {/* <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <p>Sanjay Badwaik</p>
        <img src={sanjay} alt='Sanjays photo' height="150" width="125"/>

      </div>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <p>Shirish Patil</p>
        <img src={shirish} alt='Shirish photo' height="150" width="125"/>

      </div>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <p>Ashish Mane</p>
        <img src={ashish} alt='Ashish photo' height="150" width="125"/>

      </div>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <p>Sagar Girme</p>
        <img src={sagar} alt='Sagar photo' height="150" width="125"/> */}

      {/* </div> */}


      <table className="table table-bordered table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Shirish Patil</th>
                                <th scope="col">Sanjay Badwaik</th>
                                <th scope="col">Ashish Mane</th>
                                <th scope="col">Sagar Girme</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                <img src={shirish} alt='Shirish photo' height="150" width="125"/>
                                </td>
                                <td>
                                <img src={sanjay} alt='Sanjay photo' height="150" width="125"/>
                                </td>
                                <td>
                                <img src={ashish} alt='Ashish photo' height="150" width="125"/>
                                </td>
                                <td>
                                <img src={sagar} alt='Sagar photo' height="150" width="125"/>
                                </td>


                            </tr>
                        </tbody>
        </table>
    </div>
  </div>
   
}

export default Aboutus