import React, {useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {categories, departments, getCategory, getDepartment, getType, types} from "../../utils/job-post-data";

const Filters = ({filters, handleChangeFilters}) => {
  const [dropdown, setDropdown] = useState({
    department: false,
    category: false,
    type: false
  })
  return (
    <div className='d-flex justify-content-sm-end flex-wrap align-items-center '>
      <Dropdown isOpen={dropdown.department} toggle={() => setDropdown({...dropdown, department: !dropdown.department})}>
        <DropdownToggle
          className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0"
          caret
        >
          {filters.department !== '' ? getDepartment(filters.department) : 'Select Department'}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleChangeFilters('department', '')} >All</DropdownItem>
          {
            departments.map(dep => (
              <DropdownItem onClick={() => handleChangeFilters('department', dep.code)} key={dep.code}>{dep.title}</DropdownItem>
            ))
          }
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={dropdown.category} toggle={() => setDropdown({...dropdown, category: !dropdown.category})}>
        <DropdownToggle
          className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0 ml-2"
          caret
        >
          {filters.category !== '' ? getCategory(filters.category) : 'Select Category'}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleChangeFilters('category', '')} >All</DropdownItem>
          {
            categories.map(cat => (
              <DropdownItem onClick={() => handleChangeFilters('category', cat.code)} key={cat.code}>{cat.title}</DropdownItem>
            ))
          }
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={dropdown.type} toggle={() => setDropdown({...dropdown, type: !dropdown.type})}>
        <DropdownToggle
          className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0 ml-2"
          caret
        >
          {filters.type !== '' ? getType(filters.type) : 'Select Type'}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleChangeFilters('type', '')} >All</DropdownItem>
          {
            types.map(type => (
              <DropdownItem onClick={() => handleChangeFilters('type', type.code)} key={type.code}>{type.title}</DropdownItem>
            ))
          }
        </DropdownMenu>
      </Dropdown>
      <div className="position-relative">
        <input type="text" className='form-control ml-2 ' placeholder='Search for jobs' value={filters.search} onChange={(event) => handleChangeFilters('search', event.target.value)}/>
        <span className='fa fa-search position-absolute ' style={{top: '30%', right: 0, fontSize: 16}}/>
      </div>
    </div>
  );
};

export default Filters;