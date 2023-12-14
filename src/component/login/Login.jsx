import { gapi } from "gapi-script";
import { Component } from "react";
import GoogleLogin from "react-google-login";


const clientId = "68551729269-ieoafb59hssbhc73jjtgbjqu6r80cl5r.apps.googleusercontent.com";

class Login extends Component {

    constructor(props){
        super(props)
        function start(){
            gapi.client.init({
              clientId: clientId,
              scope: ""
            })
  
          }
          gapi.load("client:auth2", start)

    }

    onSuccess = (res) =>{
        console.log('login Succeded =' + JSON.stringify(res.profileObj));
        console.log('login Succeded =' + res.profileObj.name);
        this.props.onSuccessLogin(res.profileObj);
    }

    render(){
        return(
            <div id="signInButton">
                <GoogleLogin
                    clientId={clientId}
                    onSuccess={this.onSuccess}
                    buttonText={this.props.label}
                    onFailure={()=>{}}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    fetchBasicProfile={true}
                />
            </div>
        )
    }

}

export default Login;