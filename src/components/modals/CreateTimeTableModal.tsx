import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { ClassRoutineRequirementsInterface, Classroom, Course, TimeSlot, User } from '../../interfaces/classInterfaces';
import { Modal } from '../Modal';

import { MODAL_TYPES } from '../../constants/consts';

interface CreateClassRoutineModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: () => Promise<void>;
  classRequirements?: ClassRoutineRequirementsInterface;
  formData: TimeFormData;
  mode: string;
  setFormData: Dispatch<SetStateAction<TimeFormData>>;
}

export interface TimeFormData {
  classRoomId: number;
  courseId: number;
  timeSlotId: number;
  lecturerId: number;
  studentIds: number[];
}

const CreateClassRoutineModal: React.FC<CreateClassRoutineModalProps> = ({
  show,
  handleClose,
  classRequirements,
  handleSubmit,
  formData,
  setFormData,
  mode
}) => {
  useEffect(() => {
    if (mode === MODAL_TYPES.EDIT_MODE) {
      // Populate form data if in edit mode
      // Assuming formData is already populated with the data to be edited
    }
  }, [mode, formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value)
    });
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const checked = e.target.checked;
    if (checked) {
      setFormData({
        ...formData,
        studentIds: [...formData.studentIds, id]
      });
    } else {
      setFormData({
        ...formData,
        studentIds: formData.studentIds.filter((studentId) => studentId !== id)
      });
    }
  };

  let title = 'Create Routine';
  if (mode === MODAL_TYPES.EDIT_MODE) {
    title = 'Edit Routine';
  }

  return (
    <Modal
      shouldShowModal={show}
      size="md"
      handleClose={handleClose}
      header={title}
      footer={
        <button
          className="btn btn--primary"
          onClick={handleSubmit}
          disabled={
            formData.classRoomId === 0 ||
            formData.courseId === 0 ||
            formData.lecturerId === 0 ||
            !formData.studentIds.length ||
            formData.timeSlotId === 0
          }
        >
          Save
        </button>
      }
      isOverFlowModal
      wrapperClass="create-class-routine-modal"
    >
      <Form>
        <Form.Group>
          <Form.Label>Classroom</Form.Label>
          <Form.Control as="select" name="classRoomId" value={formData.classRoomId} onChange={handleInputChange}>
            <option value="">Select Classroom</option>
            {classRequirements?.classrooms.map((classroom: Classroom) => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Course</Form.Label>
          <Form.Control as="select" name="courseId" value={formData.courseId} onChange={handleInputChange}>
            <option value="">Select Course</option>
            {classRequirements?.courses.map((course: Course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Lecturer</Form.Label>
          <Form.Control as="select" name="lecturerId" value={formData.lecturerId} onChange={handleInputChange}>
            <option value="">Select Lecturer</option>
            {classRequirements?.lecturers.map((lecturer: User) => (
              <option key={lecturer.id} value={lecturer.id}>
                {lecturer.fullName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Students</Form.Label>
          <ListGroup>
            {classRequirements?.students.map((student: User) => (
              <ListGroup.Item key={student.id}>
                <Form.Check
                  type="checkbox"
                  id={`student-${student.id}`}
                  label={student.fullName}
                  checked={formData.studentIds.includes(student.id)}
                  onChange={(e) => handleMultiSelectChange(e, student.id)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Time Slot</Form.Label>
          <Form.Control as="select" name="timeSlotId" value={formData.timeSlotId} onChange={handleInputChange}>
            <option value="">Select Time Slot</option>
            {classRequirements?.timeSlots.map((timeSlot: TimeSlot) => (
              <option key={timeSlot.id} value={timeSlot.id}>
                {timeSlot.day} {timeSlot.startTime} - {timeSlot.endTime}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </Modal>
  );
};

export default CreateClassRoutineModal;
