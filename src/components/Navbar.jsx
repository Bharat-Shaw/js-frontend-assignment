import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate();
    const [toggle, setToggle] = useState('vendor_list');

    useEffect(()=>{
        if(window.location.pathname=='/'){
            setToggle('vendor_list')
        }
    },[window.location.pathname])

    return (
        <div className='flex justify-between items-center px-6  md:px-20 shadow font-semibold'>
            <span className='cursor-pointer md:py-5 text-lg font-semibold'
                onClick={() => {
                    navigate('/')
                    setToggle('vendor_list')
                }}>
                JS Tigers</span>
            <div className='flex gap-5 md:gap-10'>
                <span className={`cursor-pointer py-5 md:py-5 ${toggle == 'create_vendor' ? 'border-[3px] border-white border-b-slate-900' : ''} `}
                    onClick={() => {
                        navigate('/create');
                        setToggle('create_vendor')
                    }}>Create vendor</span>
                <span className={`cursor-pointer py-5 md:py-5 ${toggle == 'vendor_list' ? 'border-[3px] border-white border-b-slate-900' : ''} `}
                    onClick={() => {
                        navigate('/');
                        setToggle('vendor_list')
                    }}>Vendor List</span>
            </div>
        </div>
    )
}

export default Navbar