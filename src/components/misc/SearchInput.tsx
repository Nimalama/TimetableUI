import { FiSearch } from 'react-icons/fi';

export const SearchInput = ({
  value,
  handler,
  placeholder
}: {
  value: string;
  placeholder: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="course-search">
      <input
        className="form-control search-field-terms"
        type="search"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={handler}
      />
      <FiSearch size={18} className="icon" stroke="#A8A8BF" />
    </div>
  );
};
