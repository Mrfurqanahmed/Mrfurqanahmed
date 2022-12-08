import React from "react";
import { useLocation } from "react-router-dom";

import userlogo from '../../assets/stethoscope.png'
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import dashboardcss from "./dashboard.css";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";


import logo from "../../assets/logo.svg"
const InsertMed = () => {
  const navigate = useNavigate();
  const [resStatus, setresStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    email: "",
  });
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    console.log(formData);

  }

  const postData = () => {
    if (formData.name !== "") {
      const data = JSON.stringify({
        name: formData.name,
      });

      fetch("https://doc-advisor-heroku.herokuapp.com/api/user/insertMed", {
        method: "post",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
        .then((res) => {
          setresStatus(res.status);
          if (res.status === 200)
          {
            setErrorMessage(`Medicine Inserted Successfully`);
            handleShow();
         
            return res.json();
          } 
          else throw new Error(res.status);
        })
        .catch((err) => {
          console.log("error: " + err);
          navigate("/insertMed");
          setErrorMessage(`ERROR: ${resStatus} --> Invalid`);
          handleShow();
        })
        .finally(() => {
          setFormData({
            name: "",
          });
        });
    }
  };
  
  return (
    <div>
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="#home"><img className="img-fluid logo" src={logo} alt="DocAdvisor" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown
                  className="me-4"
                  title="Menu"
                  id="doc-nav-dropdown"
                >
                  <NavDropdown.Item href="/admindashBoard">DashBoard</NavDropdown.Item>
                
           
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
          
        </Container>
        <div className='pe-4 d-flex' style={{color:"#12126a",fontWeight: 'bold'}}><img src={userlogo} alt="" className="pe-1"/>ADMIN</div>

      </Navbar>



      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 fs-4">
                    <span style={{ color: "#ff9e15" }}>
                      <span className="fs-3">D</span>oc
                    </span>
                    <span className="fs-3">A</span>dvisor @ADMIN MODULE
                  </p>
                </div>
                <div className="fs-1 d-flex justify-content-center align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Insert Medicine</p>
                </div>

                {/*<!-- Email input -->*/}
                <div className="form-outline mb-4">
                  <label className="form-label" for="form3Example3">
                    Medicine Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-md"
                    placeholder="Enter Name Of Medicine"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

   

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-lg fw-bold px-4 py-2 "
                    style={{ color: "white", backgroundColor: "#ff9e15" }}
                    onClick={postData}
                  >
                    INSERT
                  </button>
                </div>
              </form>
            </div>


          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          </Modal>
    </div>
  );
};

export default InsertMed;
