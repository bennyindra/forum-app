import { Link, useParams } from "react-router-dom";
import { getThreadPostList, saveNewThreadPost } from "../../api/thread-service/ThreadService";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Button, Card, Container, FormControl, FormControlLabel, Grid, Pagination, Stack, Typography } from "@mui/material";
import { Component, Fragment } from "react";
import AddThreadDialog from "../main-screen/AddThreadDialog";


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class ThreadPost extends Component {

    constructor(props){
        super(props)
        this.state = {
            threadId : this.props.params.threadId,
            page: 1,
            totalElement: 0,
            totalPages: 0,
            openAddThreadDialog: false,
            username: this.props.username,
            showBackdrop: false
        }
    }


    async componentDidMount(){
        this.fetch()
    }

    

    
    handleAddDialogChanges = (isOpen) => {
        this.setState({
            openAddThreadDialog: isOpen
        })
    }

    handleSave = async (thread) => {
        thread['googleId'] = this.props.profileObj.googleId
        thread['createdBy'] = this.props.username
        thread['threadId'] = this.state.threadId
        this.setState({showBackdrop: true});
        try {
            await saveNewThreadPost(thread)
        } catch (error) {
            alert(error)
        }
        this.setState({showBackdrop: false});
        
        this.fetch()
    }


    fetch = async() => {
        this.setState({showBackdrop: true});
        try {
            const result = await getThreadPostList(this.state.page,this.state.threadId);
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


    render(){
        
        return (
            <div>
                <Link to={"/"}><IconButton variant="contained" label="back"><ArrowBack/>Back</IconButton></Link>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.showBackdrop}
                    onClick={()=> this.setState({showBackdrop: false})}
                ><CircularProgress color="inherit" /></Backdrop>
                    
                <Fragment>
                    <Container maxWidth="xm">
                    <Typography variant="h3">Threads</Typography>
                    <Grid container spacing={2}>
                        {this.props.username &&<Grid item xs={8} direction="row" alignItems="center" justify="flex-end">
                            <FormControl fullWidth sx={{ m: 1 }}>
                            <FormControlLabel control={<Button variant="contained" size="medium" onClick={()=>this.handleAddDialogChanges(true)}>New Thread Post</Button>}/>
                            </FormControl>
                        </Grid>}
                    </Grid>
                    <hr/>
                    <Pagination count={this.state.totalPages} onChange={this.handleChange} variant="outlined" color="primary" size="large" />
                    <hr/>
                        <Stack spacing={2}>

                        {this.state.threads && this.state.threads.map((row)=>(
                            <Card sm={{ minWidth: 275 }}>
                                    <Typography label="Title" variant="h6" color="text.secondary" gutterBottom>{"Title: "+row.title}</Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {"created by:" + row.createdBy}
                                    </Typography>
                                    <Typography variant="body">
                                        {row.content}
                                    </Typography>
                            </Card>
                        ))}
                        </Stack>
                        <hr/>
                        <Pagination count={this.state.totalPages} onChange={this.handleChange} variant="outlined" color="primary" size="large"  />
                        <hr/>
                    </Container>
                    <AddThreadDialog isOpen={this.state.openAddThreadDialog} 
                    onChangeStateDialog={(isOpen) => this.handleAddDialogChanges(isOpen)} 
                    handleSave={(thread) => this.handleSave(thread)}
                    dialogText={"Please insert Thread Post and Content"}
                    dialogTitle={"Add New Thread Post"}/>
                </Fragment>
            
            </div>
        );
    }
}


export default withParams(ThreadPost);