import React, { useEffect, useState } from 'react';
import { createClassroom, deleteClassroom, getClassrooms } from '../services/classroomServices';
import { ClassroomInterface, ClassroomPayloadInterface } from '../interfaces/commonInterfaces';
import CreateClassroomModal from './modals/CreateClassroomModal';
import CommonRemoveModal from './modals/CommonRemoveModal';

const Classrooms: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [classrooms, setClassrooms] = useState<ClassroomInterface[]>([]);
  const [payload, setPayload] = useState<ClassroomPayloadInterface>({
    name: '',
    capacity: 0
  });

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await getClassrooms(); // Replace with your API endpoint
      setClassrooms(response);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleSubmit = async () => {
    // Add your API call here

    try {
      const response = await createClassroom(payload);

      if (response) {
        fetchClassrooms();
        toggleCreateModal();
        setPayload({
          name: '',
          capacity: 0
        });
      }
    } catch (error) {
      console.error('Error creating classroom:', error);
    }
  };

  const removeClassroom = async (classroomId: number) => {
    // Add your API call here
    try {
      const response = await deleteClassroom(classroomId);

      if (response) {
        fetchClassrooms();
        toggleDeleteModal();
        setSelectedId(0);
      }
    } catch (error) {
      console.error('Error deleting classroom:', error);
    }
  };

  return (
    <section className="container">
      <div className="d-flex justify-content-between my-2x">
        <h2>Classrooms</h2>

        <button onClick={toggleCreateModal} className="btn btn--primary">
          Create Classroom
        </button>
      </div>
      <div className="table-wrapper">
        <table className="common-table">
          <thead>
            <tr>
              <th>Classroom Name</th>
              <th>Capacity</th>
              <th></th>
              {/* Add additional columns if needed */}
            </tr>
          </thead>
          <tbody>
            {classrooms.map((classroom) => (
              <tr key={classroom.id}>
                <td>{classroom.name}</td>
                <td>{classroom.capacity}</td>
                <td>
                  <button
                    className="btn btn--danger btn--sm"
                    onClick={() => {
                      setSelectedId(+classroom.id);
                      toggleDeleteModal();
                    }}
                  >
                    Delete
                  </button>
                </td>
                {/* Add additional columns if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CommonRemoveModal
        title="Delete Classroom"
        show={showDeleteModal}
        handleClose={toggleDeleteModal}
        handleClick={removeClassroom}
        selectedId={selectedId}
      />
      <CreateClassroomModal
        show={showCreateModal}
        handleClose={toggleCreateModal}
        data={payload}
        setData={setPayload}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default Classrooms;
