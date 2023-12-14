import { Backdrop, Button, Card, CardActions, CardContent, Checkbox, CircularProgress, Container, FormControl, FormControlLabel, Grid, Pagination, Paper, Stack, Typography } from "@mui/material";
import { Component, Fragment } from "react";
import { getThread, getPostThreadOwn, saveNewPost } from "../../api/thread-service/ThreadService";
import AddThreadDialog from "./AddThreadDialog";
import { Link } from "react-router-dom";


class MainScreen extends Component{
    // {"googleId":"105171178520467521319","imageUrl":"https://lh3.googleusercontent.com/a/ACg8ocJs28YTJgqeyxusdTSaTkyrBUcOB2UIt8wYpTtlQIKc=s96-c","email":"bennyindra.official@gmail.com","name":"benny indra","givenName":"benny","familyName":"indra"}
    constructor(props){
        super(props)
        this.state = {
            token: '',
            email: '',
            isNeedLogin: true,
            threads: [],
            profileObj: undefined,
            page: 1,
            totalElement: 0,
            totalPages: 0,
            openAddThreadDialog: false,
            ownPost: true,
            showBackdrop: false
        }

    }
    
    async componentDidMount(){
        this.fetchPostThread();
    }

    fetchPostThread = async() => {
        this.setState({showBackdrop: true});
        try {
            
            const result = await getThread(this.state.page);
            this.setState({
                threads: result.content,
                totalElement: result.totalElements,
                totalPages: result.totalPages
            })
        } catch (error) {
            alert(error)
        }
        this.setState({showBackdrop: false});
    }

    fetchPostThreadOwn = async(userId) => {
        this.setState({showBackdrop: true});
        const result = await getPostThreadOwn(this.state.page,userId);
        this.setState({
            threads: result.content,
            totalElement: result.totalElements,
            totalPages: result.totalPages
        })
        this.setState({showBackdrop: false});
    }

    handleChange = async (_, value) => {
        this.setState({showBackdrop: true});
        const result = await getThread(value, 10);
        this.setState({
            threads: result.content,
            page: value,
            totalElement: result.totalElements,
            totalPages: result.totalPages
        })
        this.setState({showBackdrop: false});
      };

    handleOwnPostChange = async (checked) => {
        if(checked){
            const ownId = this.props.profileObj.googleId;
            this.fetchPostThreadOwn(ownId);
        } else{
            this.fetchPostThread();
        }

      };

    handleChangeSearch = async (event) => {
        this.setState({
            searchKey: event.target.value
        })
      };

    handleAddDialogChanges = (isOpen) => {
        this.setState({
            openAddThreadDialog: isOpen
        })
    }

    handleSave = async (thread) => {
        
        thread['googleId'] = this.props.profileObj.googleId
        thread['createdBy'] = this.props.username
        this.setState({showBackdrop: true});
        try {
            await saveNewPost(thread);
        } catch (error) {
            
        }
        this.setState({showBackdrop: false});
        this.fetchPostThread()
        
    }


    render(){
        
        return (
            <Fragment>      
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.showBackdrop}
                    onClick={()=> this.setState({showBackdrop: false})}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                    <Container maxWidth="xm">
                    <Typography variant="h3">Threads</Typography>
                    <Grid container spacing={2}>
                        {this.props.username &&<Grid item xs={8} direction="row" alignItems="center" justify="flex-end">
                            <FormControl fullWidth sx={{ m: 1 }}>
                            <FormControlLabel control={<Button variant="contained" size="medium" onClick={()=>this.handleAddDialogChanges(true)}>New Thread</Button>}/>
                            </FormControl>
                        </Grid>}
                        {this.props.username && <Grid item xs={2}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                            <FormControlLabel control={<Checkbox />} label="own post" onChange={(event, checked)=> this.handleOwnPostChange(checked)}/>
                            </FormControl>
                        </Grid>}
                    </Grid>
                    <hr/>
                    <Pagination count={this.state.totalPages} onChange={this.handleChange} variant="outlined" color="primary" size="large" />
                    <hr/>
                        <Stack spacing={2}>

                        {this.state.threads.map((row)=>(
                            <Card sm={{ minWidth: 275 }}>
                                <CardContent>                                       
                                    <Typography label="Title" variant="h6" color="text.secondary" gutterBottom>{"Title: "+row.title}</Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {"created by:" + row.createdBy}
                                    </Typography>
                                    <Typography variant="body">
                                        {row.content}
                                    </Typography>
                                    <Paper elevation={3} />
                                </CardContent>
                                <CardActions>
                                    <Link to={'/thread-post/'+row.id}><Button size="small">Jump In</Button></Link>
                                </CardActions>
                            </Card>
                        ))}
                        </Stack>
                        <hr/>
                        <Pagination count={this.state.totalPages} onChange={this.handleChange} variant="outlined" color="primary" size="large"  />
                        <hr/>
                    </Container>
                    <AddThreadDialog isOpen={this.state.openAddThreadDialog} onChangeStateDialog={(isOpen) => this.handleAddDialogChanges(isOpen)}
                     handleSave={(thread) => this.handleSave(thread)}
                     dialogText={"Please insert thread Title and Content"}
                     dialogTitle={"Add New Thread"}/>
                </Fragment>
            
        )
    }

}


export default MainScreen;