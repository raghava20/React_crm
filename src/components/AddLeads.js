
import React, { useState, useContext, useEffect } from 'react'
import { LeadContext } from '../App';
// import { useNavigate } from 'react-router-dom';

function AddLeads(props) {
    useEffect(() => {
        {
            console.log(props)
        }
    }, [])


    let context = useContext(LeadContext);
    // let navigate = useNavigate();
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [contact, setContact] = useState("");
    let [company, setCompany] = useState("");
    let handleSave = () => {
        context.data.push({
            name,
            email,
            contact,
            company,
        })
        context.setData([...context.data])
    }

    return (
        <div>
            <h1>Add Leads</h1>
            <div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Name</label>
                    <input type="text" class="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name" />
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Contact</label>
                    <input type="text" class="form-control" onChange={(e) => setContact(e.target.value)} placeholder="Contact" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Company</label>
                    <input type="text" class="form-control" onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
                </div>

                <button className="btn btn-primary" onClick={handleSave}>Submit</button>
            </div>
        </div>
    )
}

export default AddLeads;
