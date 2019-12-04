import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PasswordField from 'material-ui-password-field'


import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createMuiTheme();

export default class UserList extends React.Component {
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
      offset: 0,
    }
    if (localStorage.getItem("key") == 0 || localStorage.getItem("key") == 1) {
      window.location.href = "/sign-in";
  } else {

  }
  }
  componentDidMount = () => {
    axios.post('http://localhost:3003/todos/show')
      .then((res) => {
        if (res.data.length > 0)
          this.setState({ dataList: res.data })
      }).catch((error) => {
        console.log(error)
      });
  }

  handleClick(offset) {
    this.setState({ offset });
    console.log("offset:", offset)
  }

  onSignup = () => {
    if (this.state.password === this.state.confirm) {
      let body = { name: this.state.name, birthday: this.state.birthday, address: this.state.address, email: this.state.email, password: this.state.password, flag: "2" }
      axios.post('http://192.168.1.190:3003/todos/add', body)
        .then((res) => {
          console.log(res.data)
          alert("Successful!!");
          window.location.reload();
        }).catch((error) => {
          console.log(error)
        });
    } else {
      alert("not same password with confirm!");
    }

    this.setState({
      name: '',
      birthday: '',
      address: '',
      email: '',
      password: '',
      confirm: '',
      flag: '',
    })
  }
  delete = (data) => {
    alert("item clicked : " + data)
    let id = data
    axios.delete('http://192.168.1.190:3003/todos/userdelete/' + id)
      .then((res) => {
        console.log(res.data)
        alert("Successful_del!!");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      });
  }
  updatename = (e) => { this.setState({ name: e.target.value }) }
  updatebirthday = (e) => { this.setState({ birthday: e.target.value }) }
  updateaddress = (e) => { this.setState({ address: e.target.value }) }
  updateemail = (e) => { this.setState({ email: e.target.value }) }
  updatepassword = (e) => { this.setState({ password: e.target.value }) }
  updateconfirm = (e) => { this.setState({ confirm: e.target.value }) }

  render() {
    return (
      <div>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              helperText="Please specify the first name"
              label="Name"
              margin="dense"
              name="firstName"
              onChange={this.updatename}
              required
              value={this.state.name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={2}
            xs={12}
          >
            {/* <TextField
              fullWidth
              label="Birthday"
              margin="dense"
              name="lastName"
              onChange={this.updatebirthday}
              required
              value={this.state.birthday}
              variant="outlined"
              helperText="Please input password"
            /> */}
            <TextField
              id="date"
              label="Date"
              type="date"
              onChange={this.updatebirthday}
              defaultValue={this.state.date}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              style={{widt:'350px'}}
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Address"
              margin="dense"
              name="email"
              onChange={this.updateaddress}
              required
              value={this.state.address}
              variant="outlined"
              helperText="Please input confirm"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Email"
              margin="dense"
              name="phone"
              onChange={this.updateemail}
              type="email"
              value={this.state.email}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <PasswordField
              fullWidth
              hintText="At least 8 characters"
              helperText="Please specify the first name"
              floatingLabelText="Enter your password"
              errorText="Your password is too short"
              value={this.state.password}
              onChange={this.updatepassword}
              id="password"
            />

          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <PasswordField
              fullWidth
              hintText="At least 8 characters"
              helperText="Please specify the first name"
              floatingLabelText="Enter your password"
              errorText="Your password is too short"
              value={this.state.confirm}
              onChange={this.updateconfirm}
              id="password"
            />

          </Grid>


        </Grid>

        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={this.onSignup}
          >
            ADD User
          </Button>
        </CardActions>
        <Table
          // className={classes.table}
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="enhanced table"
        >

          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <span>No</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Name</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Birthday</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Address</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Email</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Password</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Delete</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {

              this.state.dataList.map((item, index) => {
                let start = this.state.offset * 10 - 1
                let end = this.state.offset * 10 + 10
                while (start < index && index < end) {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell padding="checkbox">
                      <span>{index + 1}</span>
                    </TableCell>
                    <TableCell padding="checkbox">
                      <span>{item.name}</span>
                    </TableCell>
                    <TableCell padding="checkbox">
                      <span>{item.birthday}</span>
                    </TableCell>
                    <TableCell padding="checkbox">
                      <span>{item.address}</span>
                    </TableCell>
                    <TableCell padding="checkbox">
                      <span>{item.email}</span>
                    </TableCell>
                    <TableCell padding="checkbox">
                      <span>{item.password}</span>
                    </TableCell>
                    <TableCell padding="checkbox">
                      <Button
                        onClick={this.delete.bind(this, item._id)}
                      >Delete
                                                        </Button>
                    </TableCell>
                  </TableRow>
                )}
              })
            }

          </TableBody>
        </Table>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Pagination
            limit={1}
            offset={this.state.offset}
            total={100}
            onClick={(e, offset) => this.handleClick(offset)}
          />
        </MuiThemeProvider>
      </div>
    );
  }

}