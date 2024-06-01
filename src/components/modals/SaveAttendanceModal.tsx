import { Form } from 'react-bootstrap';
import { ClassRoutineData } from '../../interfaces/classInterfaces';
import { Modal } from '../Modal';
import { useState } from 'react';
import { saveAttendance } from '../../services/attendanceServices';

import Select, { MultiValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

const SaveAttendanceModal = ({
  classRoutine,
  handleClose,
  show
}: {
  classRoutine: ClassRoutineData;
  show: boolean;
  handleClose: () => void;
}) => {
  const [selectedStudents, setSelectedStudents] = useState<Option[]>([]);

  const handleChange = (newValue: MultiValue<Option>) => {
    const selected = newValue as Option[];

    setSelectedStudents(selected);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await saveAttendance({
        studentIds: selectedStudents.map((student) => +student.value),
        classRoutineId: classRoutine.id
      });

      if (response) {
        alert('Attendance saved successfully');
        handleClose();
        setSelectedStudents([]);
      }
    } catch (error) {
      console.error('Error creating classroom:', error);
    }
  };

  const studentOptions = classRoutine.students.map((ss) => ({
    value: ss.id.toString() ?? '',
    label: ss.fullName ?? ''
  })) as Option[];

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
          <button className="btn mt-3x btn--primary" onClick={handleFormSubmit} disabled={!selectedStudents.length}>
            Save
          </button>
        </Form>
      </>
    </Modal>
  );
};

export default SaveAttendanceModal;
