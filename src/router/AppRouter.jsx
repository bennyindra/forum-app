import { Link, Route, Routes } from "react-router-dom"
import MainScreen from "../container/main-screen/MainScreen";
import ThreadPost from "../container/thread-post/ThreadPost";
import { Component, Fragment } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Login from "../component/login/Login";
import { ArrowBack } from "@mui/icons-material";
import { GoogleLogout } from "react-google-login";




class AppRouter extends Component {
  constructor(props){
    super(props)
    this.state = {
        searchKey: this.props.searchKey,
        username: this.props.username,
        token: '',
        email: '',
        isNeedLogin: true,
        threads: [],
        profileObj: this.props.profileObj,
        page: 1,
        totalElement: 0,
        totalPages: 0,
        openAddThreadDialog: false,
        ownPost: true,
        googleId: this.props.googleId,
        childPage: false,
      }
    }

    render ()
      {return (
        <Fragment>
        <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            > 

                        </IconButton>
                        <IconButton />
                        
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Forum Dayin 
                        </Typography>
                        {this.state.childPage && <Link to={"/"}><IconButton variant="contained" label="back"><ArrowBack/>Back</IconButton></Link>}
                        {this.state.username && <GoogleLogout buttonText={"Logout : "+ this.state.username} onLogoutSuccess={()=> {
                          this.setState({username: undefined, profileObj: undefined})
                        }}/>}
                        {!this.state.username && 
                         <Login label={'Login'} onSuccessLogin={(profileObj) => this.setState({username: profileObj.name, profileObj: profileObj})}/>
                        }
                        </Toolbar>
                    
                </AppBar>
                <Routes>
                  <Route 
                    element={<ThreadPost username={this.state.username} profileObj={this.state.profileObj} />}
                    path={`/thread-post/:threadId`} 
                    render={props=>
                      <ThreadPost threadId={props.threadId} />
                    } 
                  />
                  <Route 
                    path="/" 
                    element={<MainScreen username={this.state.username} profileObj={this.state.profileObj} googleId={this.state.googleId}/>}

                  />
                </Routes>
        </Box>
      </Fragment>
      )
    };
}


export default AppRouter;