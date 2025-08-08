import React from 'react'

const EmployeeCardIcon = ({name}) => {
    let colorKey = 0;
    for(let i = 0; i < name.length; i++){
        colorKey = (colorKey + name.charCodeAt(i)) % 5;
    }
    const color = ["green","yellow","red","purple","blue"][colorKey];
    let initals = name.toUpperCase()[0];
    initals += name.split(" ")[1].toUpperCase()[0];


    return (
        <div className="employee-card-icon" style={{background:`var(--profile-${color})`}}>{initals}</div>
    )
}

export default EmployeeCardIcon