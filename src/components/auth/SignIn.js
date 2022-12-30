import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, notification } from "antd";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import axios from 'axios';
import userAuth from "./user_auth";

const openNotification = (title, msg) => {
  notification.open({
    message: title,
    description: msg
  });
};

// These are objects containing layout information for the form. They are used to customize the appearance of the form.
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

// This is a function that is called when the form submission fails. It logs the error information to the console.
const onFinishFailed = errorInfo => {
  console.log("Failed:", errorInfo);
};

class Login extends React.Component {
  // This is a method of the `Login` class that is called when the form is submitted. It takes an object containing the form values as an argument and attempts to authenticate the user by checking if their email and password match a user in our database (regardless where the database is). If the login is succesful, it dispatches it to the Redux store.
  login = values => {
    // This line calls the axios library, making HTTP requests in JavaScript.
    axios
    // This chain of method calls sends a POST request to the /api/login endpoint on the backend with the following object as the request body:
      .post('/login', {
        email: values.username,
        password: values.password
      })
      // This chain of method calls sets up a callback function to be called when the request is successful. !The response argument is the response from the server!
      .then(response => {
        console.log(response)
        // This line checks if the success field in the response data is true. If it is, it continues to the next line.
        if (response.data.success) {
          // This line calls the `user_login` method from the component's props (which is a a Redux action) with the `user` field from the response data as an argument. This will update the Redux store with the user data returned by the backend.  
          this.props.user_login(response.data.user);
        } else {
          openNotification('Error', 'Invalid Credentials');
        }
      })
      .catch(error => {
        console.error(error);
        openNotification('Error', 'An error occurred while logging in');
      });
  };  

  
  render() {
    // if provider manages to log in, redirect to /patientlist
    // This is a method of the `Login` class that retuns the JSX code for rendering the login form. It first cheks if the user is already logged in, and if so, it redirects them to a different page depending on their role. If the user is logged in, it returns the form. 
    if (this.props.auth.isLoggedIn === true) {
      if (this.props.auth.domain === "doctor")
        return <Redirect to="/patientlist" />;
        // // if the patient  manages to log in, redirect to /patientlist
      if (this.props.auth.domain === "patient")
        return <Redirect to={"/myprofile/" + this.props.auth.id} />;
    }

    return (
      <div className="container">
        <h1>Sign In</h1>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true
          }}
          onFinish={this.login}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email ID"
            name="username"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email id!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapPropsToState = dispatch => {
  return {
    user_login: data => {
      dispatch({ type: "USER_LOGIN", data: data });
    }
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, mapPropsToState)(Login);
