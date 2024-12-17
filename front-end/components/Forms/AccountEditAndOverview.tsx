import React, { use, useState } from 'react';
import InputField from '@components/uiComponents/InputField';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@types';
import CustomDropdown from '@components/uiComponents/CustomDropdown';
import CustomButton from '@components/uiComponents/CustomButton';
import { UserService } from '@services/UserService';

interface AccountFormProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const AccountForm: React.FC<AccountFormProps> = ({ user, setUser }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const switchEditable = () => {
        setIsEditable((prev) => !prev);
    };

    const handleSwitchAdvanced = () => {
        setShowAdvanced((prev) => !prev);
    };

    const handleUpdateAccount = async () => {
        try {
            const updatedData = {
                email: user.email,
                name: user.name,
                address: user.address,
            };

            const updatedUser = await UserService.updateUser(updatedData);
            setUser(updatedUser);
            alert('Account updated successfully');
            setIsEditable(false);
        } catch (error) {
            console.error('Failed to update account:', error);
            alert(error instanceof Error ? error.message : 'Failed to update account');
        }
    };

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("New passwords don't match!");
            return;
        }

        try {
            const updatedUser = await UserService.updateUser({
                email: user.email,
                password: newPassword
            });

            setUser(updatedUser);
            alert('Password updated successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowAdvanced(false);
        } catch (error) {
            console.error('Failed to update password:', error);
            alert(error instanceof Error ? error.message : 'Failed to update password');
        }
    };

    return (
        <div className="accountForm">
            <div className="accountHeader">
                <h4>Account Information</h4>
                <FontAwesomeIcon
                    className="accountEditButton"
                    icon={faUserPen}
                    onClick={switchEditable}
                    color={!isEditable ? 'black' : 'green'}
                />
            </div>
            <InputField
                title="Email:"
                label={user.email}
                editable={false}
                value={user.email}
                onChange={(event) => {}}
            />
            <InputField
                title="Name:"
                label={user.name}
                editable={isEditable}
                value={user.name}
                onChange={(event) =>
                    setUser((prev) => ({ ...prev, name: event.target.value }))
                }
            />
            <InputField
                title="Address:"
                label={user.address}
                editable={isEditable}
                value={user.address}
                onChange={(event) =>
                    setUser((prev) => ({ ...prev, address: event.target.value }))
                }
            />
            <CustomDropdown label="Password" onClick={handleSwitchAdvanced} />
            {showAdvanced && (
                <>
                    <InputField
                        label="Enter current password"
                        editable
                        value={currentPassword}
                        secure
                        onChange={(event) => setCurrentPassword(event.target.value)}
                    />
                    <InputField
                        label="Enter new password"
                        editable
                        value={newPassword}
                        secure
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                    <InputField
                        label="Confirm new password"
                        editable
                        value={confirmPassword}
                        secure
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    <CustomButton label="Update Password" onPress={handleUpdatePassword} />
                </>
            )}
            <CustomButton label="Update Account" onPress={handleUpdateAccount} />
        </div>
    );
};

export default AccountForm;
