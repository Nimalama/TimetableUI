import { Form, ListGroup } from 'react-bootstrap';
import { ClassRoutineData, User } from '../../interfaces/classInterfaces';
import { Modal } from '../Modal';
import { useState } from 'react';
import { saveAttendance } from '../../services/attendanceServices';

const SaveAttendanceModal = ({
  classRoutine,
  handleClose,
  show
}: {
  classRoutine: ClassRoutineData;
  show: boolean;
  handleClose: () => void;
}) => {
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedStudentIds([...selectedStudentIds, id]);
    } else {
      setSelectedStudentIds(selectedStudentIds.filter((studentId) => studentId !== id));
    }
  };

  const handleFormSubmit = async () => {
    try {
      const response = await saveAttendance({
        studentIds: selectedStudentIds,
        classRoutineId: classRoutine.id
      });

      if (response) {
        handleClose();
        setSelectedStudentIds([]);
      }
    } catch (error) {
      console.error('Error creating classroom:', error);
    }
  };

  return (
    <Modal
      shouldShowModal={show}
      size="md"
      handleClose={handleClose}
      header="Save Attendance"
      wrapperClass="create-class-routine-modal"
    >
      <>
        <p>
          {classRoutine.timeSlot.day} | {classRoutine.lecturer.fullName} | {classRoutine.course.name}
        </p>
        <Form>
          <Form.Group>
            <Form.Label>Students</Form.Label>
            <ListGroup>
              {classRoutine?.students.map((student: User) => (
                <ListGroup.Item key={student.id}>
                  <Form.Check
                    type="checkbox"
                    id={`student-${student.id}`}
                    label={student.fullName}
                    onChange={(e) => handleMultiSelectChange(e, student.id)}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>
          <button className="btn mt-3x btn--primary" onClick={handleFormSubmit} disabled={!selectedStudentIds.length}>
            Save
          </button>
        </Form>
      </>
    </Modal>
  );
};

export default SaveAttendanceModal;
