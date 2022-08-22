import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { VscSearch } from 'react-icons/vsc';
import { SearchBar, Form, Btn, BtnLabel, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const searchName = e.currentTarget.elements.query.value;

    if (searchName.trim() === '') {
      toast.error('Please enter a search name');
      return;
    }
    if (searchName.length < 3) {
      toast.warn('Search name must be at least 3 characters long');
      return;
    }

    onSubmit(searchName);
    e.currentTarget.reset();
  };

  return (
    <SearchBar>
      <Form onSubmit={handleSubmit}>
        <Btn type="submit">
          <VscSearch size={20} />
          <BtnLabel></BtnLabel>
        </Btn>

        <Input
          type="text"
          name="query"
          autocomplete="off"
          placeholder="Search images and photos"
        />
      </Form>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
