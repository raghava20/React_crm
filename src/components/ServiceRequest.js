import React, { useContext, useState } from 'react'
import SideBar from './SideBar';
import { LeadContext } from '../App';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

function ServiceRequest() {
    let context = useContext(LeadContext);
    console.log("contexxt", context);

    console.log(context.data)
    // console.log(context.data)

    return (
        <div>
            <SideBar />
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Request</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            context.data.map((e, i) => {
                                return <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.contact}</td>
                                    <td><FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Age">
                                            <MenuItem value={1}>Created</MenuItem>
                                            <MenuItem value={2}>Released</MenuItem>
                                            <MenuItem value={3}>Open</MenuItem>
                                            <MenuItem value={4}>Canceled</MenuItem>
                                            <MenuItem value={5}>In process</MenuItem>
                                            <MenuItem value={6}>Completed</MenuItem>
                                        </Select>
                                    </FormControl></td>

                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ServiceRequest
