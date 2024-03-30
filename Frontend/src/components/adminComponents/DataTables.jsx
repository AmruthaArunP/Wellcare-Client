import React from 'react'
import DataTable from 'react-data-table-component'
import PropTypes from 'prop-types'

DataTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
}

function DataTables(props) {
  return (
    <>
    <DataTable className='border-2 shadow-md rounded' columns={props.columns} data={props.data}  fixedHeader highlightOnHover 
    striped
    responsive
    pagination
    paginationPerPage={5}
    paginationRowsPerPageOptions={[5, 10, 20, 50]} 
    />
    </>
  )
}

export default DataTables

