import { Form } from 'react-bootstrap';
import { Modal } from '../Modal';
import { useState } from 'react';
import { saveComment } from '../../services/attendanceServices';

const AddCommentModal = ({
  classRoutineId,
  handleClose,
  show,
  isReply = false,
  id = 0,
  callback = () => undefined
}: {
  id?: number;
  isReply?: boolean;
  classRoutineId: number;
  show: boolean;
  handleClose: () => void;
  callback: () => Promise<void> | undefined;
}) => {
  const [comment, setComment] = useState('');

  const handleFormSubmit = async () => {
    try {
      const newComment = isReply ? `ID:${id} Reply:` + comment : comment;
      const response = await saveComment({
        classRoutineId,
        comment: newComment
      });

      if (response) {
        alert('Comment added successfully');
        setComment('');
        handleClose();

        callback && callback();
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
      header="Add Comment"
      wrapperClass="create-class-routine-modal"
    >
      <>
        <Form>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
          </Form.Group>
        </Form>

        <button className="btn mt-3x btn--primary" onClick={handleFormSubmit} disabled={!comment.length}>
          Save
        </button>
      </>
    </Modal>
  );
};

export default AddCommentModal;
