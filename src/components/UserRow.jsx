import React from "react"

const UserRow = ({name,gender,role,maritalStatus,id})=>{
    return (
        <>
        <td>{id}</td>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{role}</td>
        <td>{maritalStatus?"married":"unmarried"}</td>
        </>
    )
}
export {UserRow}