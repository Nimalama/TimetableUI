import useDashboardContext from '../hooks/useChallengesDashboardContext';

const Profile = () => {
  const { userInformation } = useDashboardContext();

  return (
    <section className="my-6x">
      <div className="px-3x">
        <p>Fullname: {userInformation?.fullName}</p>
        <p>Email: {userInformation?.email}</p>
      </div>
    </section>
  );
};

export default Profile;
