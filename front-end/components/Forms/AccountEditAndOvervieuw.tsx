import React, { useState } from 'react';
import InputField from '@components/General/inputField';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@types';
import CustomDropdown from '@components/General/customDropdown';
import CustomButton from '@components/General/customButton';
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
    setIsEditable(!isEditable);
  };

  const handleSwitchAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleUpdateAccount = async () => {
    try {
      const updatedUser = await UserService.updateUser(user);
      setUser(updatedUser);
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      alert('Account updated successfully');
      setIsEditable(false);
    } catch (error) {
      console.error('Failed to update account:', error);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords don\'t match!');
      return;
    }

    if (currentPassword !== user.password) {
      alert('Current password is incorrect!');
      return;
    }

    try {
      const updatedUser = { ...user, password: newPassword };
      await UserService.updateUser(updatedUser);
      setUser(updatedUser);
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      alert('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowAdvanced(false);
    } catch (error) {
      console.error('Failed to update password:', error);
      alert('Failed to update password. Please try again.');
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
        title="Name:"
        label={user.name}
        editable={isEditable}
        value={user.name}
        onChange={(event) =>
          setUser((prev) => ({ ...prev, name: event.target.value }))
        }
      />
      <InputField
        title="Email:"
        label={user.email}
        editable={isEditable}
        value={user.email}
        onChange={(event) =>
          setUser((prev) => ({ ...prev, email: event.target.value }))
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
            label="Enter current Password"
            editable
            value={currentPassword}
            secure
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
          <InputField
            label="Enter new Password"
            editable
            value={newPassword}
            secure
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <InputField
            label="Confirm new Password"
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
