import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { ClassRoutineRequirementsInterface, Classroom, Course, User } from '../../interfaces/classInterfaces';
import { Modal } from '../Modal';

import { MODAL_TYPES } from '../../constants/consts';
import Select, { MultiValue } from 'react-select';

interface CreateClassRoutineModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: () => Promise<void>;
  classRequirements?: ClassRoutineRequirementsInterface;
  formData: TimeFormData;
  mode: string;
  setFormData: Dispatch<SetStateAction<TimeFormData>>;
}

interface Option {
  value: string;
  label: string;
}

export interface TimeFormData {
  classRoomId: number;
  courseId: number;
  timeSlotId: number;
  lecturerId: number;
  studentIds: number[];
  singleSlot: boolean;
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

  const [selectedStudents, setSelectedStudents] = useState<Option[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value)
    });
  };

  let title = 'Create Schedule';
  if (mode === MODAL_TYPES.EDIT_MODE) {
    title = 'Edit Routine';
  }

  const studentOptions = classRequirements?.students.map((ss) => ({
    value: ss.id.toString() ?? '',
    label: ss.fullName ?? ''
  })) as Option[];

  const handleChange = (newValue: MultiValue<Option>) => {
    const selected = newValue as Option[];
    setSelectedStudents(selected);

    const newStudentIds = selected.map((student) => +student.value);

    setFormData({
      ...formData,
      studentIds: newStudentIds
    });
  };

  return (
    <Modal
      shouldShowModal={show}
      size="md"
      handleClose={handleClose}
      header={title}
      footer={
        <button
          className="btn btn--primary"
          onClick={() => {
            setFormData({
              ...formData,
              studentIds: selectedStudents.map((student) => Number(student.value))
            });

            handleSubmit();
          }}
          disabled={
            formData.classRoomId === 0 ||
            formData.courseId === 0 ||
            formData.lecturerId === 0 ||
            !selectedStudents.length ||
            (formData.singleSlot && formData.timeSlotId === 0)
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
          <div>
            <label>Select Students</label>
            <Select
              isMulti
              value={selectedStudents}
              onChange={handleChange}
              options={studentOptions}
              classNamePrefix="select"
              placeholder={`Select users...`}
              closeMenuOnSelect={false}
            />
          </div>
        </Form.Group>

        <div className="d-flex justify-content-between my-3x">
          <Form.Check
            type="radio"
            name="timeSlotOption"
            id="singleTimeSlot"
            value="single"
            checked={formData.singleSlot}
            onChange={() =>
              setFormData({
                ...formData,
                singleSlot: true
              })
            }
            label="Single Time Slot"
          />
          <Form.Check
            type="radio"
            name="timeSlotOption"
            id="multipleTimeSlots"
            value="multiple"
            checked={!formData.singleSlot}
            onChange={() =>
              setFormData({
                ...formData,
                singleSlot: false
              })
            }
            label="12 Weeks"
          />
        </div>

        {formData.singleSlot && (
          <Form.Group>
            <Form.Label>Time Slot</Form.Label>
            <Form.Control as="select" name="timeSlotId" value={formData.timeSlotId} onChange={handleInputChange}>
              <option value="">Select Time Slot</option>
              {classRequirements?.timeSlots.map((timeSlot) => (
                <option key={timeSlot.id} value={timeSlot.id}>
                  {timeSlot.day} {timeSlot.startTime} - {timeSlot.endTime}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}
      </Form>
    </Modal>
  );
};

export default CreateClassRoutineModal;
