import { Dispatch, SetStateAction } from 'react';
import { Modal } from '../Modal';
import { ClassroomPayloadInterface } from '../../interfaces/commonInterfaces';
import { MODAL_TYPES } from '../../constants/consts';

const CreateClassroomModal = ({
  show,
  handleClose,
  handleSubmit,
  data,
  setData,
  mode
}: {
  mode: string;
  data: ClassroomPayloadInterface;
  show: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  setData: Dispatch<SetStateAction<ClassroomPayloadInterface>>;
}) => {
  let title = 'Create Classroom';

  if (mode === MODAL_TYPES.EDIT_MODE) {
    title = 'Edit Classroom';
  }

  return (
    <Modal
      shouldShowModal={show}
      size={'md'}
      handleClose={handleClose}
      header={title}
      footer={
        <button
          className="btn btn--primary"
          onClick={handleSubmit}
          disabled={data.name.length < 1 || data.capacity.length < 0}
        >
          Save
        </button>
      }
      isOverFlowModal
    >
      <>
        <div className="form-group">
          <label>Classroom Name</label>
          <input
            type="text"
            className="form-control mb-6x"
            placeholder="Enter classroom name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Capacity</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter capacity"
            value={data.capacity}
            onChange={(e) => setData({ ...data, capacity: e.target.value })}
          />
        </div>
      </>
    </Modal>
  );
};

export default CreateClassroomModal;
