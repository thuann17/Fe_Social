import React from 'react';

const AccountDetail = () => {
    return (
        <div>
            <h1>Account Profile</h1>
            <div>
                <label>Name:</label>
                <span>John Doe</span>
            </div>
            <div>
                <label>Email:</label>
                <span>john.doe@example.com</span>
            </div>
            <div>
                <label>Role:</label>
                <span>Admin</span>
            </div>
        </div>
    );
};

export default AccountDetail;