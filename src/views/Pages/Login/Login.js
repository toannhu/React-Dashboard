import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
var axios = require('axios');

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.updateUsernameValue = this.updateUsernameValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  updateUsernameValue(evt){
    this.setState({
      username: evt.target.value
    });
  }

  updatePasswordValue(evt){
    this.setState({
      password: evt.target.value
    });
  }

  onBtnClick() {
    const tokens = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWluaHRoYW5oIiwiaWF0IjoxNTE2NDMwNTk3fQ.1OvbqGr3-K0Ax4gnzjz3t38Y__MmW1to8ICQ33u4XEM';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokens;
    let data = JSON.stringify({
      phone: this.state.username,
      password: this.state.password
  })
    axios.post('http://159.89.206.221:4000/user/login', data, {
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      if (response.data.token.length > 0) {
        window.sessionStorage.setItem('token', response.data.token);
        window.location.href = "http://localhost:8081/#/dashboard";
      }
    })
    .catch(function (error) {
      alert(error);
    });
  }

  render() {
    window.sessionStorage.removeItem('token');
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-user"></i>
                        </span>
                      </div>
                      <Input type="text" placeholder="Username" onChange={this.updateUsernameValue}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-lock"></i>
                        </span>
                      </div>
                      <Input type="password" placeholder="Password" onChange={this.updatePasswordValue}/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.onBtnClick}>Login</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
