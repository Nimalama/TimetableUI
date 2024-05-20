import { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../services/attendanceServices';
import { CommentInterface } from '../interfaces/classInterfaces';
import CommonRemoveModal from '../components/modals/CommonRemoveModal';
import AddCommentModal from '../components/modals/AddCommentModal';
import { FiArrowUp } from 'react-icons/fi';

const Comments = () => {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const toggleCommentModal = () => {
    setShowCommentModal(!showCommentModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await getComments(); // Replace with your API endpoint
      setComments(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const removeComment = async (id: number) => {
    // Add your API call here
    try {
      const response = await deleteComment(id);

      if (response) {
        fetchComments();
        toggleDeleteModal();
      }
    } catch (error) {
      console.error('Error deleting classroom:', error);
    }
  };

  const filteredComment = comments.filter((cc) => !cc.comment.includes('Reply:'));

  const replyComments = comments
    .map((cc) => {
      if (cc.comment.includes('ID:') && cc.comment.includes('Reply:')) {
        const data = cc.comment.split('ID:')[1].split('Reply:');

        console.log(data);

        if (data.length === 2) {
          const id = parseInt(data[0].trim());
          const comment = `Reply: ${data[1].trim()}`;
          return { id, comment };
        }
      }
      return null; // Return null for comments that don't match the pattern
    })
    .filter(Boolean); // Filter out null values

  return (
    <section className="course_page">
      <div className="container overflow-hidden">
        <h2 className="mb-3x">Comments</h2>

        {!comments.length && <p>No comments found</p>}

        {filteredComment.map((comment) => (
          <div key={comment.id} className="comment-card mb-4x">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <strong>ClassRoutineId:</strong> {comment.classRoutineId}
                <div>
                  {comment.students.fullName} <small>{comment.students.email}</small>
                </div>
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
              </div>
              <button className="btn btn--sm btn--danger" onClick={toggleDeleteModal}>
                Delete
              </button>
              <CommonRemoveModal
                title="Delete Comment"
                show={showDeleteModal}
                handleClose={toggleDeleteModal}
                handleClick={removeComment}
                selectedId={comment.id}
                source="comment"
              />
            </div>
            <div className="comment-paragraph mt-2x">Comment : {comment.comment}</div>
            {replyComments.map((replyComment) =>
              replyComment?.id === comment.id ? (
                <div className="comment-paragraph mt-2x">{replyComment.comment}</div>
              ) : null
            )}
            <div className="mt-2x text-blue d-flex align-items-center" onClick={toggleCommentModal}>
              Reply <FiArrowUp size={18} />
            </div>
            <AddCommentModal
              isReply
              callback={fetchComments}
              id={comment.id}
              handleClose={toggleCommentModal}
              show={showCommentModal}
              classRoutineId={comment.classRoutineId}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comments;
