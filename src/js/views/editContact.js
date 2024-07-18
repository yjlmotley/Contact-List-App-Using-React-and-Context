import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    // This stores the current contact information
    const [contact, setContact] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    });

    // Need this to run for when depedencies change
    useEffect(() => {
        // This finds the contact in the store that matches the ID from the URL params
        const contactData = store.contacts.find(
            (c) => c.id === parseInt(params.id)
        );

        // If the contact is found, updates the local status with their info
        if (contactData) {
            setContact(contactData);
        }
    }, [params.id, store.contacts]);

    // Event handler for input field changes
    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // this calls the editContact with the contact id and info
        actions.editContact(params.id, contact);

        navigate("/");
    };

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    // To edit form
    return (
        <div className="container">
            <h1 className="text-center mt-5">Update Contact</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group mt-3">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={contact.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mt-2">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mt-2">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={contact.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mt-2">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={contact.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary mt-4 form-control">
                    {contact.id ? "Update Contact" : "save"}
                </button>
            </form>
            <a
                href="/"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                style={{
                    textDecoration: isHovered ? 'underline' : 'none',
                    cursor: 'default'
                }}
            >
                Or get back to contacts
            </a>
        </div>
    );
};

// Props for the edit contact component
EditContact.propTypes = {
    match: PropTypes.object,
};


export default EditContact;