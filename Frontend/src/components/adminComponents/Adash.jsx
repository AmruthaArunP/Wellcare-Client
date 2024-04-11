const handleBlockUnblock = async (row) => {
  let result;
  if (row.isBlocked === false) {
    result = await Swal.fire({
      title: 'Do you want to block the department?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });
  } else {
    result = await Swal.fire({
      title: 'Do you want to unblock the department?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });
  }
  if (result.isConfirmed) {
    try {
      const response = await adminAxios.patch('/admin/manageDepartment',{
        status: row.isBlocked,
        id: row._id
      })
      if (response.data.message) {
        console.log("status......",response.data);
        setDepartList((prevDepartments) => {
          return prevDepartments.map((department) => {
            if (department._id === row._id) {
              return {
                ...department,
                isBlocked: !department.isBlocked,
                
              };
            }
            return department;
          });
        });
        setFilteredData((prevDepartments) => {
          return prevDepartments.map((doc) => {
            if (doc._id === row._id) {
              return {
                ...doc,
                isBlocked: !doc.isBlocked,
              };
            }
            return doc;
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
};