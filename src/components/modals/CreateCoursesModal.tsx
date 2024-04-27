import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import { Modal } from '../Modal';
import { CoursePayloadInterface } from '../../interfaces/commonInterfaces';
import { API_BASE_URL, MODAL_TYPES } from '../../constants/consts';

const CreateCourseModal = ({
  show,
  handleClose,
  handleSubmit,
  data,
  setData,
  mode
}: {
  data: CoursePayloadInterface;
  show: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  mode: string;
  setData: Dispatch<SetStateAction<CoursePayloadInterface>>;
}) => {
  const coursePicRef = useRef<HTMLImageElement | null>(null);
  const coursePicInputRef = useRef<HTMLInputElement | null>(null);

  let title = 'Create Course';

  if (mode === MODAL_TYPES.EDIT_MODE) {
    title = 'Edit Course';
  }

  const CoursePicture = (): JSX.Element => {
    if (!data.coursePic) return <></>;

    return (
      <div className="avatar avatar--md avatar--round">
        <img ref={coursePicRef} src={`${API_BASE_URL}${data.coursePic}`} alt="Course Image" />
      </div>
    );
  };

  // Function for handling pic upload
  const openChooseAFile = () => {
    coursePicInputRef?.current && coursePicInputRef.current.click();
  };

  const handlePicChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // As per the doc, file reader works asynchronously, so adding try catch block for preventing crashes.

    try {
      const { files } = event.target;

      if (!files?.length) return;

      const file = files[0];

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        // Base64 url to load image
        const fileData = reader.result as string;

        if (coursePicRef?.current) {
          coursePicRef.current.src = fileData;
        }

        setData({ ...data, coursePic: file });
      };
    } catch (err) {
      console.debug(err);
    }
  };

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
          disabled={data.name.length < 1 || data.code.length < 0 || !!(data.credits && data.credits < 1)}
        >
          Save
        </button>
      }
      isOverFlowModal
    >
      <>
        <div className="form-group">
          <CoursePicture />
          <div className="avatar-upload">
            <button type="button" onClick={() => openChooseAFile()} className="btn btn--primary py-2x btn--sm">
              Choose Photo
            </button>
            <input
              name="uploadFile"
              type="file"
              accept="image/*"
              ref={coursePicInputRef}
              onChange={handlePicChange}
              className="d-none"
            />
          </div>
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
            value={data.credits ?? ''}
            onChange={(e) => setData({ ...data, credits: +e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter course category"
            value={data.category ?? ''}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          />
        </div>
      </>
    </Modal>
  );
};

export default CreateCourseModal;
