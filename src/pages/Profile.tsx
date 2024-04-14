import useDashboardContext from '../hooks/useChallengesDashboardContext';
 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
interface User {
  id: number;
  profilePic: string | null;
  address: string | null;
  department: string | null;
  fullName: string;
  userType: 'admin' | 'teacher' | 'student';
  email: string;
}
 
const UserProfile: React.FC = () => {
  const { userInformation } = useDashboardContext();
 
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState({
    profilePic: '',
    address: '',
    department: '',
    fullName: ''
  });
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<User>('/api/users/profile');
        setUser(response.data);
        setProfileData({
          profilePic: response.data.profilePic || '',
          address: response.data.address || '',
          department: response.data.department || '',
          fullName: response.data.fullName || userInformation?.fullName || ''
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
 
    fetchUserProfile();
  }, []);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch('/api/users/profile', profileData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
 
  if (!user) {
    return <div>Loading...</div>;
  }
 
  const isSubmissionButtonDisabled = true;
 
  return (
<div>
<>
<h2 className="fs-h2main mb-8x">Personal Information</h2>
<form method="POST" onSubmit={handleSubmit}>
<div className="account-setting__picture d-flex align-items-center mb-9x">
<div className="avatar-container mr-6x text-center">
<div
                style={{ display: !profileData?.profilePic ? 'flex' : 'none' }}
                className="avatar avatar--md avatar--round"
>
<span className="avatar--text">{profileData.fullName ?? 'ads'}</span>
</div>
              {/* <UserProfilePicture /> */}
</div>
 
            <div className="avatar-upload">
              {/* <button type="button" onClick={() => openChooseAFile()} className="btn btn--primary py-2x outline btn--sm">
              {personalInfoErrMsg?.profilePic?.length ? 'Choose Another Image' : 'Choose Photo'}
</button> */}
              {/* <input
              name="uploadFile"
              type="file"
              accept="image/*"
              ref={userProfilePicInputRef}
              onChange={handlePicChange}
              className="d-none"
            /> */}
              {/* {personalInfoErrMsg?.profilePic?.length ? (
<p className="error-text mb-0x mt-1x text-center text-danger">{personalInfoErrMsg?.profilePic}</p>
            ) : (
<p className="mb-0x mt-1x text-center">
<small className="account-setting__picture-size">Maximum Size: 2MB</small>
</p>
            )} */}
</div>
</div>
<div className="form-group mb-6x">
<label htmlFor="fullName">Your Full Name</label>
<input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={profileData.fullName}
              placeholder="Enter your full name"
              onChange={handleChange}
            />
</div>
<div className="form-group mb-6x disabled">
<label htmlFor="emailAddress">Your Email Address</label>
<input
              type="email"
              className="form-control"
              id="emailAddress"
              value={userInformation?.email}
              placeholder={userInformation?.email ?? 'example@gmail.com'}
              onChange={handleChange}
              disabled
            />
</div>
 
          <div className="form-group mb-6x disabled">
<label>UserType</label>
<input
              type="text"
              className="form-control"
              value={userInformation?.userType}
              onChange={handleChange}
              disabled
            />
</div>
<div className="form-group mb-6x">
<label>Your Department</label>
<input
              // onChange={handleChange}
              name="department"
              className="form-control p-3x"
              id="bio"
              // value={profileData?.bio ?? ''}
              placeholder="enter your department"
></input>
</div>
<div className="form-group mb-6x">
<label htmlFor="location">Your Location</label>
<input
              type="text"
              name="address"
              className="form-control"
              id="address"
              value={profileData?.address ?? ''}
              placeholder="City, Country"
              onChange={handleChange}
            />
</div>
 
          <div className="account-setting__action d-flex justify-content-end">
<button
              type="button"
              disabled={isSubmissionButtonDisabled}
              // onClick={() => resetPersonalInfo()}
              className="btn btn--ghost btn--sm py-2x"
>
              Cancel
</button>
<button
              disabled={isSubmissionButtonDisabled}
              type="submit"
              className={`btn btn--primary btn--sm ${isSubmissionButtonDisabled ? 'btn-disabled' : ''}`}
>
              Save
              {/* {isprofileDataUpdating : 'Save Changes'} */}
</button>
</div>
</form>
</>
</div>
  );
};
 
export default UserProfile;