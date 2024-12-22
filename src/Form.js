import React, { useState, useRef } from 'react';
import './Form.css';

function Form() {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        yesterdaysUpdates: '',
        todaysUpdates: ''
    });

    const [savedResponses, setSavedResponses] = useState([]);
    const [showMessage, setShowMessage] = useState(''); 

    // Dynamic refs for saved responses
    const responseRefs = useRef([]);

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the date already exists in saved responses
        const existingIndex = savedResponses.findIndex(
            (response) => response.date === formData.date
        );

        let updatedResponses;

        if (existingIndex !== -1) {
            // Update the existing response
            updatedResponses = [...savedResponses];
            updatedResponses[existingIndex] = { ...formData }; // Replace with updated data

            // Show a message that the response was updated
            setShowMessage("Your responses are updated for same date successfully!");
        } else {
            // Add the new response
            updatedResponses = [...savedResponses, formData];

            // Show a message that the response was added
            setShowMessage("Your Daily updates are submitted successfully!");
        }

        setSavedResponses(updatedResponses); // Update the state with modified responses

        // Clear the form
        setFormData({
            name: '',
            date: '',
            yesterdaysUpdates: '',
            todaysUpdates: ''
        });

        // Hide the success message after 5 seconds
        setTimeout(() => {
            setShowMessage('');
        }, 5000);

        // Scroll to the newly added or updated response
        setTimeout(() => {
            const scrollIndex = existingIndex !== -1 ? existingIndex : updatedResponses.length - 1;
            if (responseRefs.current[scrollIndex]) {
                responseRefs.current[scrollIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 0);
    };

    return (
        <div className="form-container">
            <div className="scroll">
                <marquee>This form has to be filled by 6pm today.</marquee>
            </div>
            
            <form className="form" onSubmit={handleSubmit}>
                <div className="v-align">
                    <div className="wd-150">Name:</div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="wd-150"
                    />
                </div>

                <div className="v-align">
                    <div className="wd-150">This Update is for:</div>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="wd-150"
                        max={getTodayDate()} // Restrict date to today or earlier
                    />
                </div>

                <div className="wd-300">
                    <div>Yesterday's Work updates:</div>
                    <textarea
                        name="yesterdaysUpdates"
                        rows="8"
                        cols="38"
                        value={formData.yesterdaysUpdates}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="wd-300">
                    <div>Today's Work updates:</div>
                    <textarea
                        name="todaysUpdates"
                        rows="8"
                        cols="38"
                        value={formData.todaysUpdates}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>

            {/* Saved Responses Section */}
            <div className="responses">
                <h2>Saved Responses</h2>
                {savedResponses.length === 0 ? (
                    <p>No responses saved yet.</p>
                ) : (
                    savedResponses.map((response, index) => (
                        <div
                            key={index}
                            className="response-card"
                            ref={(el) => (responseRefs.current[index] = el)} // Assign dynamic ref
                        >
                            <p><strong>Name:</strong> {response.name}</p>
                            <p><strong>Date:</strong> {response.date}</p>
                            <p><strong>Yesterday's Updates:</strong> {response.yesterdaysUpdates}</p>
                            <p><strong>Today's Updates:</strong> {response.todaysUpdates}</p>
                            <hr />
                        </div>
                    ))
                )}

                {/* Show success message for additions or updates */}
                {showMessage && (
                    <div className="success-message">
                        <p>{showMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Form;
