import React, { useContext, useState } from 'react'
import SideBar from './SideBar';
import { LeadContext } from '../App';
import AddLeads from './AddLeads';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

function Leads() {
    let context = useContext(LeadContext);
    console.log("contexxt", context);

    console.log(context.data)
    // console.log(context.data)
    let handleDelete = (e) => {
        context.data.splice(context.data.indexOf(e), 1)
        context.setData([...context.data])
    }

    return (
        <div>
            <SideBar />
            <AddLeads />
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Company</th>
                            <th scope="col">Status</th>
                            <th scope="col">Options</th>
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
                                    <td>{e.company}</td>
                                    <td><FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Age">
                                            <MenuItem value={1}>New</MenuItem>
                                            <MenuItem value={2}>Lost</MenuItem>
                                            <MenuItem value={3}>Contacted</MenuItem>
                                            <MenuItem value={4}>Canceled</MenuItem>
                                            <MenuItem value={5}>Qualified</MenuItem>
                                            <MenuItem value={6}>Confirmed</MenuItem>
                                        </Select>
                                    </FormControl></td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(e)}>Delete</button></td>

                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Leads
