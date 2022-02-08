import React, { useState, useEffect, useRef } from 'react';
import SideBar from './SideBar';
import "../styles/Settings.css"
import { Modal, Button, Stack } from 'react-bootstrap';
import { FormControl, RadioGroup, FormControlLabel, FormLabel, Radio } from "@mui/material"
import axios from "axios"
import { API_URL } from "./API_URL"
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';

export default function Users() {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [currentRole, setCurrentRole] = useState("")
    const [passId, setPassId] = useState("")
    const navigate = useNavigate()
    let decodedRef = useRef()
    let refToken = useRef()

    useEffect(() => {
        const localToken = localStorage.getItem("token")
        let decodedToken = jwt.decode(localToken)
        if (decodedToken.exp * 1000 <= Date.now()) {
            return navigate("/login")
        }
        else {
            decodedRef.current = decodedToken.existUser.role
            refToken.current = localToken;
            getDataFromDb()
        }
    }, [])

    const getDataFromDb = async () => {
        await fetch(`${API_URL}/users`, {
            method: "GET",
            headers: {
                token: refToken.current
            }
        }).then(data => data.json()).then(data => setData(data))
    }
    const handleRoleModal = (role, id) => {
        setCurrentRole(role)
        setShow(true)
        setPassId(id)
    }

    const changeRoleHandler = async () => {
        await axios.put(`${API_URL}/users/` + passId,
            {
                role: currentRole
            },
            {
                headers: {
                    token: refToken.current
                }
            })
        getDataFromDb()
        setShow(false)
    }
    return <>
        <SideBar />
        <div className="request-page">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e, i) => {
                            if (e.role === 'Admin' || e.role === 'Manager') return null;
                            return <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{e.firstName}</td>
                                <td>{e.lastName}</td>
                                <td>{e.email}</td>
                                <td>
                                    <div className="role-edit-button" onClick={() => handleRoleModal(e.role, e._id)}>
                                        <i class="fas fa-user-edit">{e.role === "" ? "unassigned" : e.role}</i>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        <Modal show={show} onHide={() => {
            setCurrentRole("")
            setShow(false)
        }} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title >
                    Do you want to change Role?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body fluid="true">
                <Stack>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Role:</FormLabel>
                        <RadioGroup row name="row-radio-buttons-group" value={currentRole} onChange={(e) => {
                            setCurrentRole(e.target.value)
                        }}>
                            <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
                            <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => changeRoleHandler()}>Submit</Button>
            </Modal.Footer>
        </Modal>
    </>;
}
