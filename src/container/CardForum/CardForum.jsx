import React, { Component } from "react";
import './CardForum.css'
import { Button, TextField,Grid } from "@mui/material";


class CardForum extends Component{
    state = {
        order: 0
    }

    handleCounterChanges = (value) =>{
        this.setState({
            order: value
        })
        this.props.onCounterChange(value)
    }

    handleClickPlus = () => {
        const value = this.state.order + 1
        this.handleCounterChanges(value);
    }

    
    handleClickMinus = () =>{
        const value = this.state.order - 1
        this.handleCounterChanges(value);
    }

    render(){
        return (
                <div className="card">
                    <div className="img-thumb-prod">
                        <img src="" alt=""/>
                    </div>
                    <p className="product-title">Mesin Cuci</p>
                    <p className="product-price">Rp. 30.000</p>
                    <div className="counter">
                        <Grid item md={12}>
                            <Grid container spacing={1}>
                            <Grid item md={9}>
                                <Button variant="contained" onClick={this.handleClickPlus}>+</Button>
                                <TextField id="filled-basic" variant="filled" size="small" value={this.state.order}/>
                                <Button variant="contained" onClick={this.handleClickMinus}>-</Button>
                            </Grid>
                            </Grid>
                        </Grid>
                    </div>

                </div>
        )
    }
}

export default CardForum;