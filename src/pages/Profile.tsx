import useDashboardContext from '../hooks/useChallengesDashboardContext';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ProfilePayloadInterface, UserProfileInterface } from '../interfaces/commonInterfaces';
import { getProfile, patchProfile } from '../services/authServices';
import { API_BASE_URL } from '../constants/consts';

const UserProfile: React.FC = () => {
  const { userInformation } = useDashboardContext();

  const userProfilePicInputRef = useRef<HTMLInputElement | null>(null);
  const profilePicRef = useRef<HTMLImageElement | null>(null);

  const [user, setUser] = useState<UserProfileInterface | null>(null);
  const [profileData, setProfileData] = useState<ProfilePayloadInterface>({
    profilePic: null,
    address: null,
    department: '',
    fullName: ''
  });

  const fetchUserProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response);
      setProfileData({
        profilePic: response.profilePic,
        address: response.address,
        department: response.department,
        fullName: response.fullName
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  useEffect(() => {
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
      const formData = new FormData();

      // Add profile data to FormData
      formData.append('address', profileData.address ?? '');
      formData.append('department', profileData.department ?? '');
      formData.append('fullName', profileData.fullName);

      // If profilePic exists, append it to FormData as req.file
      if (profileData.profilePic) {
        formData.append('profilePic', profileData.profilePic);
      }

      const response = await patchProfile(formData);

      if (response) {
        alert('Profile updated successfully');
        fetchUserProfile();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  // Function for handling pic upload
  const openChooseAFile = () => {
    userProfilePicInputRef?.current && userProfilePicInputRef.current.click();
  };

  const handlePicChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // As per the doc, file reader works asynchronously, so adding try catch block for preventing crashes.

    try {
      const { files } = event.target;

      if(!files?.length)return;

      const file = files[0];

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        // Base64 url to load image
        const fileData = reader.result as string;

        if (profilePicRef?.current) {
          profilePicRef.current.src = fileData;
        }

        console.debug(file);

        setProfileData({ ...profileData, profilePic: file });
        // setUserSelectedImageFile(file);
      };
    } catch (err) {
      console.debug(err);
    }
  };

  const resetPersonalInfo = () => {
    setProfileData({
      profilePic: user.profilePic,
      address: user.address,
      department: user.department,
      fullName: user.fullName
    });
  };

  const isSubmissionButtonDisabled =
    profileData.profilePic === user.profilePic &&
    profileData.address === user.address &&
    profileData.department === user.department &&
    profileData.fullName === user.fullName;

  const UserProfilePicture = (): JSX.Element => {
    if (!user.profilePic) return <></>;

    return (
      <div className="avatar avatar--md avatar--round">
        <img ref={profilePicRef} src={`${API_BASE_URL}${user.profilePic}`} alt={user?.fullName} />
      </div>
    );
  };

  return (
    <section className="personal-info">
      <div className="container">
        <h2 className="fs-h2main mb-8x">Personal Information</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="account-setting__picture d-flex align-items-center mb-9x">
            <div className="avatar-container mr-6x text-center">
              <div
                style={{ display: !profileData?.profilePic ? 'flex' : 'none' }}
                className="avatar avatar--md avatar--round"
              >
                <span className="avatar--text">A</span>
              </div>
              <UserProfilePicture />
            </div>

            <div className="avatar-upload">
            <button type="button" onClick={() => openChooseAFile()} className="btn btn--primary py-2x btn--sm">
                Choose Photo
              </button>
              <input
                name="uploadFile"
                type="file"
                accept="image/*"
                ref={userProfilePicInputRef}
                onChange={handlePicChange}
                className="d-none"
              />
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
              onChange={handleChange}
              name="department"
              className="form-control p-3x"
              id="bio"
              value={profileData?.department ?? ''}
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
              onClick={resetPersonalInfo}
              className="btn btn--ghost btn--sm py-2x"
            >
              Cancel
            </button>
            <button
              disabled={isSubmissionButtonDisabled}
              type="submit"
              className={`btn btn--primary btn--sm ${isSubmissionButtonDisabled ? 'btn-disabled' : ''}`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
