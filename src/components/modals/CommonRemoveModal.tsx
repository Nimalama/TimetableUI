import { Modal } from '../Modal';

const CommonRemoveModal = ({
  show,
  handleClose,
  handleClick,
  selectedId,
  title
}: {
  title: string;
  show: boolean;
  selectedId: number;
  handleClose: () => void;
  handleClick: (classroomId: number) => Promise<void>;
}) => {
  return (
    <Modal
      shouldShowModal={show}
      size={'md'}
      handleClose={handleClose}
      header={title}
      footer={
        <div className="d-flex justify-content-end">
          <button className="btn btn--sm mr-4x" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn--danger btn--sm" onClick={() => handleClick(selectedId)}>
            Yes, Remove
          </button>
        </div>
      }
      isOverFlowModal
    >
      <p>Are you sure you want to delete this classroom?</p>
    </Modal>
  );
};

export default CommonRemoveModal;
