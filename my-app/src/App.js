import React from 'react';
import './App.css';
import axios from "axios";
import styled from "styled-components";

const CardContainer = styled.div `
  width: 50%;
  margin: 2vh auto;
  background-color: lightblue;
  border: 2px solid blue;
  padding: 2vh auto;
  border-radius: 15px;
`;

const Image = styled.img `
  width: 200px;
  height: 200px;
  margin: 2vh auto;
`;

const Social = styled.div `
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SocialP = styled.p `
  width: 40%;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state= {
      user: [],
      followers: []
  };
}

componentDidMount(){
  axios.get("https://api.github.com/users/redpage001").then(response => {
    console.log(response.data)
    this.setState({
      user: response.data
    });
  })
  .catch( err => {
    console.log("Failed to retrieve data", err)
  });

  axios.get("https://api.github.com/users/redpage001/followers").then(response => {
    console.log(response.data)
    this.setState({
      followers: response.data
    });
  })
  .catch( err => {
    console.log("Failed to retrieve data", err)
  });
}

render(){
  return(
    <div className="App">
      <header className="App-Header">
        <CardContainer>
          <Image src={this.state.user.avatar_url}/>
          <div className="cardInfo">
            <h3 className="name">{this.state.user.name}</h3>
            <p className="userName">{this.state.user.login}</p>
            <p className="profile">
              <a href ={this.state.user.url}>{this.state.user.url}</a>
            </p>
            <Social>
              <SocialP>Followers: {this.state.user.followers}</SocialP>
              <SocialP>Following: {this.state.user.followers}</SocialP>
            </Social>
            <p className="bio">{this.state.user.bio}</p>
          </div>
        </CardContainer>

        {this.state.followers.map(follower => (
          <CardContainer>
            <Image src={follower.avatar_url}/>
            <div className="cardInfo">
              <h3 className="name">{follower.name}</h3>
              <p className="userName">{follower.login}</p>
              <p className="profile">
                <a href ={follower.url}>{follower.url}</a>
              </p>
              <Social>
                <SocialP>Followers: {follower.followers}</SocialP>
                <SocialP>Following: {follower.followers}</SocialP>
              </Social>
              <p className="bio">{follower.bio}</p>
            </div>
          </CardContainer>
        ))}
      </header>
    </div>
    );
  }
}

export default App;
