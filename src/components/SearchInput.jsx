import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch} from 'react-icons/fa';

const SearchInput = ({ searchKeyword, handleSearch }) => {
  return (
    <InputGroup>
      <Input
        type="text"
        placeholder="Movies, shows and more"
        color="white"
        fontWeight="bold"
        value={searchKeyword}
        onChange={handleSearch}
        mt={4} // margin top
        mb={4} // margin bottom
        h={"50px"}
      />
      <InputLeftElement pointerEvents="none" mt={5} children={<FaSearch color="white" />} />
    </InputGroup>
  );
};

export default SearchInput;
