import React from 'react'
import EmployeeCardIcon from './EmployeeCardIcon'
import EditEmployeeButton from './EditEmployeeButton'

const EmployeeCard = ({employee}) => {


  return (
    <div className="employee-card">
        <EmployeeCardIcon name={employee.name}/>
        <p>{employee.name}</p>
        <p>{employee.position}</p>
        <p>{employee.email}</p>
        <p>${employee.rate}/hr</p>
        <EditEmployeeButton employeeId={employee.id}/>
    </div>
  )
}

export default EmployeeCard