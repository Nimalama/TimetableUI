import { Dispatch, SetStateAction } from 'react';
import { Modal } from '../Modal';
import { ClassroomPayloadInterface } from '../../interfaces/commonInterfaces';

const CreateClassroomModal = ({
  show,
  handleClose,
  handleSubmit,
  data,
  setData
}: {
  data: ClassroomPayloadInterface;
  show: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  setData: Dispatch<SetStateAction<ClassroomPayloadInterface>>;
}) => {
  return (
    <Modal
      shouldShowModal={show}
      size={'md'}
      handleClose={handleClose}
      header="Create Classroom"
      footer={
        <button
          className="btn btn--primary"
          onClick={handleSubmit}
          disabled={data.name.length < 1 || data.capacity < 1}
        >
          Save
        </button>
      }
      isOverFlowModal
    >
      <>
        <input
          type="text"
          className="form-control mb-6x"
          placeholder="Enter classroom name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          type="number"
          className="form-control"
          placeholder="Enter capacity"
          value={data.capacity}
          onChange={(e) => setData({ ...data, capacity: +e.target.value })}
        />
      </>
    </Modal>
  );
};

export default CreateClassroomModal;
