import { Dispatch, SetStateAction } from 'react';
import { Modal } from '../Modal';
import { CoursePayloadInterface } from '../../interfaces/commonInterfaces';

const CreateCourseModal = ({
  show,
  handleClose,
  handleSubmit,
  data,
  setData
}: {
  data: CoursePayloadInterface;
  show: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  setData: Dispatch<SetStateAction<CoursePayloadInterface>>;
}) => {
  return (
    <Modal
      shouldShowModal={show}
      size={'md'}
      handleClose={handleClose}
      header="Create Course"
      footer={
        <button
          className="btn btn--primary"
          onClick={handleSubmit}
          disabled={data.name.length < 1 || data.code.length < 0 || data.credits < 1}
        >
          Save
        </button>
      }
      isOverFlowModal
    >
      <>
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            className="form-control mb-2x"
            placeholder="Enter course name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Course Code</label>
          <input
            type="text"
            className="form-control mb-2x"
            placeholder="Enter course code"
            value={data.code}
            onChange={(e) => setData({ ...data, code: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Course Credits</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter course credits"
            value={data.credits}
            onChange={(e) => setData({ ...data, credits: +e.target.value })}
          />
        </div>
      </>
    </Modal>
  );
};

export default CreateCourseModal;
