import React, { useEffect, useState, useRef } from 'react'
import SideBar from './SideBar';
import AddLeads from './AddLeads';
import { FormControl, RadioGroup, FormControlLabel, FormLabel, Radio } from "@mui/material"
import "../styles/Leads.css";
import axios from "axios"
import { Modal, Button, Stack } from 'react-bootstrap';
import { API_URL } from "./API_URL"
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';


function Leads() {
    const [data, setData] = useState([])
    const [currentStatus, setCurrentStatus] = useState("")
    const [addLead, setAddLead] = useState(true)
    const [viewLead, setViewLead] = useState(false)
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
            refToken.current = localToken;
            setCheckRoles(decodedRef.current)
            getDataFromDb()
        }
    }, [])

    const getDataFromDb = async () => {
        await fetch(`${API_URL}/leads`, {
            method: "GET",
            headers: {
                token: refToken.current
            }
        })
            .then(data => data.json())
            .then(data => setData(data))
    }

    const handleData = () => {
        setAddLead(false)
        setViewLead(true)
    }
    const handleData2 = () => {
        setAddLead(true)
        setViewLead(false)
    }


    let handleDelete = async (id) => {
        console.log("front end", id)
        await axios.delete(`${API_URL}/leads/` + id, {
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
        await axios.put(`${API_URL}/leads/` + passId,
            {
                status: currentStatus,
            },
            {
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
                (addLead ?
                    <button className="btn btn-outline-primary leadPage-hidebtn" onClick={handleData}><i class="fas fa-pen"> Create</i></button>
                    : <button className="btn btn-outline-success leadPage-hidebtn" onClick={handleData2}><i class="far fa-list-alt"> View</i></button>
                )
            }

            {addLead ?
                <div className="leads-page">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Company</th>
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
                                        <td>{e.contact}</td>
                                        <td>{e.company}</td>
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
                : null
            }
            {viewLead ? <AddLeads getDataFromDb={getDataFromDb} /> : null}

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
                                <FormControlLabel value="New" control={<Radio />} label="New" />
                                <FormControlLabel value="Lost" control={<Radio />} label="Lost" />
                                <FormControlLabel value="Contacted" control={<Radio />} label="Contacted" />
                                <FormControlLabel value="Canceled" control={<Radio />} label="Canceled" />
                                <FormControlLabel value="Qualified" control={<Radio />} label="Qualified" />
                                <FormControlLabel value="Confirmed" control={<Radio />} label="Confirmed" />
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="danger" onClick={() => handleDelete(passData._id)}>Delete</Button> */}
                    <Button variant="success" onClick={() => changeStatusHandler()}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Leads
