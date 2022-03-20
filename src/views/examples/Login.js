// reactstrap components
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import queryString from "query-string";
import Dataservices from "../../services/requestApi";
import { Redirect } from "react-router-dom";
import { message } from "antd";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogedin, setIsLogedin] = React.useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("Authtoken");
    if (token == null) {
      setIsLogedin(false);
    } else if (token) {
      setIsLogedin(true);
    }
  }, []);
  const AuthLogin = async (e) => {
    e.preventDefault();
    try {
      const Data = {
        email,
        password,
      };
      const response = await Dataservices.Login(queryString.stringify(Data));
      const token = response.data.token;
      if (response.data.status_code) {
        message.error(response.data.message);
      } else {
        sessionStorage.setItem("Authtoken", token);
        sessionStorage.setItem("current_user_id", response.data.data._id);
        sessionStorage.setItem("current_user_name", response.data.data.name);
        window.location.reload(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  if (isLogedin) {
    return <Redirect to="/admin/index" />;
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow-lg">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-muted text-center mt-2 mb-3">
              <img
                src={require("../../assets/img/brand/logo.png").default}
                width="200"
                alt="pujyapanditg"
              />
            </div>
            <Form role="form" onSubmit={AuthLogin}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4 btn-block"
                  type="submit"
                  color="warning"
                  onClick={AuthLogin}
                >
                  Login
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
