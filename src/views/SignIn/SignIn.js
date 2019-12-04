import React, { useState, useEffect } from 'react';
import axios from "axios";

import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';
export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      birthday: '',
      address: '',
      email: '',
      password: '',
      confirm: '',
      flag: '',
      dataList: [],
      dataname: [],
    }
    localStorage.setItem("key", "0");
  }
  componentDidMount = () => {
    let body = { name: 'admin', birthday: '6/10/1996', address: 'dandong', phonenumber: '1993836374', email: 'hwolf0610@outlook.com', password: 'admin', flag: '1' }
    axios.post('http://192.168.1.190:3003/todos/start', body)
      .then((res) => {
        console.log(res.data)
        // alert("Successful!!");
      }).catch((error) => {
        console.log(error)
      });
  }

  changeemail = (e) => { this.setState({ email: e.target.value }); }
  changepass = (e) => { this.setState({ password: e.target.value }); }
  onSignin = () => {
    let body = { email: this.state.email, password: this.state.password }
    axios.post('http://192.168.1.190:3003/todos/login', body)
      .then((res) => {
        if (res.data.email[0].length > 0) {
          localStorage.setItem("name",res.data.name);
          if (res.data.flag == 1) {
            localStorage.setItem("key", "2");
          } else {
            localStorage.setItem("key", "1");
          }
          window.location.href = "/dashboard";
          // history.push('dashboard');

        } else {
          alert("No member!");
        }
        console.log(res.data.email)
      }).catch((error) => {
        console.log(error)
        alert("Wrong username or password!");
      })
    this.setState({ email: '', password: '' })

  }
  render() {

    return (
      <div  >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              variant="h2"
              style={{ height: '150px' }}
            >
            </Typography>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            <Typography
              variant="h2"
            // style={{backgroundImage: 'url(/images/auth.jpg)', height:'100%'}}
            >
            </Typography>
          </Grid>
          <Grid
            item
            md={2}
            xs={12}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <p>
              <Typography
                variant="h2"
                style={{ textAlign: 'center' }}
              >  Sign in<br/>
                </Typography>
            </p><br/>
            <p>
              <TextField
                fullWidth
                label="Email address"
                name="email"
                onChange={this.changeemail}
                type="text"
                value={this.state.email}
                variant="outlined"
              />
            </p> <br />
            <p>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={this.changepass}
                type="password"
                value={this.state.password}
                variant="outlined"
              />
            </p><br />
            <p>
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                onClick={this.onSignin}
              > Sign in now
                </Button>
            </p>

          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            &nbsp;
          </Grid>
        </Grid>


      </div>
    );

  }
} 