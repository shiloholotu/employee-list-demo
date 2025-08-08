import React from 'react'
import Link from 'next/link'


const EditEmployeeButton = ({ employeeId }) => {
  return (
    <Link href={"/edit?id=" + employeeId} className={"hover:cursor-pointer hover:opacity-50 duration-250 mr-4 hover:hover:translate-y-[-3px] mx-auto"}>•••</Link>
  )
}

export default EditEmployeeButton