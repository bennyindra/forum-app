import { Component, Fragment } from "react";
import './ForumPage.css';
import CardForum from "../CardForum/CardForum";


class ForumPage extends Component{
    state = {
        order: 0,
        name: 'Papa Ben'
    }

    handleCounterChanges = (value) =>{
        this.setState({
            order: value
        })
    }

    render(){
        return (
            <Fragment>
                <div className="header">
                    <div className="logo">
                        <img className="img-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/600px-Instagram_logo_2022.svg.png" alt=""/>
                    </div>
                    <div className="trolley">
                        <img className="img-trolley" src="https://thumbs.dreamstime.com/z/shopping-cart-icon-shopping-cart-icon-vector-shopping-cart-eps-trolley-logo-shopping-cart-logo-web-icons-trolley-icon-shopping-182252789.jpg?w=768" alt=""/>
                        <div className="count">{this.state.order}</div>
                    </div>
                </div>
                <CardForum onCounterChange={(value)=> this.handleCounterChanges(value)}/>
            </Fragment>

        )
    }

}

export default ForumPage;