import React from 'react'

function AdminFooter() {
  return (
<>
<footer className="bg-indigo-700 p-4">
      <div className="container mx-auto text-center text-white">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
      </div>
    </footer>
</>
  )
}

export default AdminFooter
