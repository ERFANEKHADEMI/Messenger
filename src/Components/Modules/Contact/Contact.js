import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
export default function Contact({ userID, username, lastOnline, type }) {
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    const addToContact = () => {
        fetch(`https://chattak-alirh.koyeb.app/users/contacts/${userID}/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorageData.token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Contact added successfully"
                    })
                }
            })
    }

    return (
        <>
            <NavLink to={`/chat/${userID}`} className={(Link) => Link.isActive && ' block bg-blue-500 text-white dark:bg-zinc-700'}>
                <div className=" flex justify-between items-center   py-3 px-5 hover:bg-blue-300 hover:text-white transition-colors dark:text-white dark:hover:bg-zinc-800">
                    <div className=" flex justify-start items-center gap-2">
                        <FaUserCircle className='text-4xl text-blue-700 dark:text-gray-300' />
                        <div className=" flex flex-col ">
                            <span className=' font-bold'>{username.slice(0, 15)}{username.length > 15 && "..."}</span>
                            <span className=' text-xs text-zinc-500'>{lastOnline}</span>
                        </div>
                    </div>
                    {
                        type === 'search' &&
                        <div className="" onClick={addToContact}>
                            <button className=' flex items-center text-blue-700 ' ><AiOutlineUserAdd className=' text-2xl' /></button>
                        </div>
                    }
                </div>
            </NavLink>
        </>
    )
}
