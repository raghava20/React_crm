import React, { useEffect, useState, useRef } from 'react'
import SideBar from './SideBar';
import { FormControl, RadioGroup, FormControlLabel, FormLabel, Radio } from "@mui/material"
import "../styles/ServiceRequest.css"
import axios from "axios"
import { Modal, Button, Stack } from 'react-bootstrap';
import { API_URL } from "./API_URL"
import jwt from "jsonwebtoken";
import AddServiceRequest from './AddServiceRequest';
import { useNavigate } from 'react-router-dom';

function ServiceRequest() {
    let [data, setData] = useState([])
    const [currentStatus, setCurrentStatus] = useState("")
    const [addRequest, setAddRequest] = useState(true)
    const [viewRequest, setViewRequest] = useState(false)
    const [show, setShow] = useState(false)
    const [passId, setPassId] = useState("")
    let decodedRef = useRef()
    const [checkRoles, setCheckRoles] = useState("")
    const navigate = useNavigate()
    let refToken = useRef()

    useEffect(() => {
        const localToken = localStorage.getItem("token")
        let decodedToken = jwt.decode(localToken)
        decodedRef.current = decodedToken.existUser.role
        if (decodedToken.exp * 1000 <= Date.now()) {
            return navigate("/login")
        }
        else {
            setCheckRoles(decodedRef.current)
            refToken.current = localToken;
            getDataFromDb()
        }
    }, [])

    const getDataFromDb = async () => {
        await fetch(`${API_URL}/service-requests`, {
            method: "GET",
            headers: {
                token: refToken.current
            }
        })
            .then(data => data.json())
            .then(data => setData(data))
    }

    const handleData = () => {
        setAddRequest(false)
        setViewRequest(true)
    }
    const handleData2 = () => {
        setAddRequest(true)
        setViewRequest(false)
    }

    let handleDelete = async (id) => {
        await axios.delete(`${API_URL}/service-requests/` + id, {
            headers: {
                token: refToken.current
            }
        })
        getDataFromDb()
    }
    const handleStatusModal = (status, id) => {
        setCurrentStatus(status)
        setShow(true)
        setPassId(id)
    }
    const changeStatusHandler = async () => {
        await axios.put(`${API_URL}/service-requests/` + passId,
            {
                status: currentStatus,
            }, {
            headers: {
                token: refToken.current
            }
        })
        getDataFromDb()
        setShow(false)
    }
    return (
        <>
            <SideBar />
            {checkRoles === "" ?
                "" :
                (addRequest ?
                    <button className="btn btn-outline-primary leadPage-hidebtn" onClick={handleData}><i class="fas fa-pen"> Create</i></button>
                    : <button className="btn btn-outline-success leadPage-hidebtn" onClick={handleData2}><i class="far fa-list-alt"> View</i></button>
                )
            }

            {addRequest ?
                <div className="request-page">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Request</th>
                                <th scope="col">Status</th>
                                {checkRoles === "" || checkRoles === "Employee" ? "" : <th scope="col">Option</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((e, i) => {
                                    return <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td>{e.request}</td>
                                        <td>
                                            <div className="role-edit-button" onClick={checkRoles === "" ? "" : (() => handleStatusModal(e.status, e._id))}>
                                                <i class="fas fa-user-edit">{e.status === "" ? "unassigned" : e.status}</i>
                                            </div>
                                        </td>
                                        {checkRoles === "" || checkRoles === "Employee" ?
                                            "" :
                                            <td>
                                                <button className="btn btn-outline-danger" onClick={() => handleDelete(e._id)}>Delete</button>
                                            </td>}

                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                : null}
            {viewRequest ? <AddServiceRequest getDataFromDb={getDataFromDb} /> : null}

            <Modal show={show} onHide={() => {
                setCurrentStatus("")
                setShow(false)
            }} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title >
                        Do you want to change status?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body fluid="true">
                    <Stack>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Status:</FormLabel>
                            <RadioGroup row name="row-radio-buttons-group" value={currentStatus} onChange={(e) => {

                                setCurrentStatus(e.target.value)
                                console.log(currentStatus)
                            }}>
                                <FormControlLabel value="Created" control={<Radio />} label="Created" />
                                <FormControlLabel value="Open" control={<Radio />} label="Open" />
                                <FormControlLabel value="In process" control={<Radio />} label="In process" />
                                <FormControlLabel value="Released" control={<Radio />} label="Released" />
                                <FormControlLabel value="Canceled" control={<Radio />} label="Canceled" />
                                <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => changeStatusHandler()}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ServiceRequest
