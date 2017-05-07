import React from 'react';

var Account = React.createClass({

    getInitialState () {
        return {
            UserName : "",
            Message : "",
        }
    },

    handleAccountNameChange (e) {
        e.preventDefault();
            this.setState({ UserName : e.target.value , Message : "..."
        });
    },

    handleSubmit(e) {
        // Prevents reinitialization
        e.preventDefault();
        let name = this.state.UserName;
        fetch('http://localhost:8080/accountCreation/createAccount?'+ 'userName=' + name, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({Message:'Account created!'});
            } else{
                this.setState({Message:  name + ' is already taken.'});
            }
        })
    },

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" defaultValue={this.state.UserName} onChange={this.handleAccountNameChange}/>
                    </label>
                    <input type="submit" value="Create Account!" />
                </form>
            UserName: {this.state.UserName}
            <br/>
            Message: {this.state.Message}
            </div>
        );
    }
});

export class AccountCreation extends React.Component{
    render(){
        return(
            <div>
                <Account/>
            </div>
        );
    }
}
