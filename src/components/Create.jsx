import React, { useContext, useState } from 'react'
import { BASE_URL } from './Vendorlist'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { MyContext } from './context/ContextApi';

function Create() {
    const { isloading, setIsloading } = useContext(MyContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vendor_name: '',
        bank_account: null,
        bank_name: '',
        address_1: '',
        address_2: '',
        city: '',
        country: '',
        zip_code: null,
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsloading(true)
        axios.post(`${BASE_URL}/vendor/create`, formData)
            .then(() => {
                setIsloading(false)
                navigate('/');
            }).catch((err) => {
                setIsloading(false)
            })
    }

    return (
        <div className='w-full flex justify-center'>
            <form onSubmit={handleSubmit} className='w-[80%] md:w-[56%] lg:w-[30%] mt-10 flex flex-col gap-4'>
            <h3 className='text-xl font-semibold'>Create new vendor</h3>
                <input type="text" name='vendor_name' required placeholder='Vendor Name' onChange={handleChange} />
                <input type="number" name='bank_account' required placeholder='Bank Account No' onChange={handleChange} />
                <input type="text" name='bank_name' required placeholder='Bank Name' onChange={handleChange} />
                <input type="text" name='address_1' placeholder='Address Line 1' onChange={handleChange} />
                <input type="text" name='address_2' placeholder='Address Line 2' onChange={handleChange} />
                <input type="text" name='city' placeholder='City' onChange={handleChange} />
                <input type="text" name='country' placeholder='Country' onChange={handleChange} />
                <input type="number" name='zip_code' placeholder='Zip Code' onChange={handleChange} />
                <button type="submit" disabled={isloading} className='bg-sky-500 flex items-center justify-center py-2 gap-6 rounded-full'>
                    <span className='w-[55%] text-right font-semibold'>Create</span>
                    <div className='w-[45%]'>
                        {
                            isloading && <ThreeCircles
                            height="20"
                            width="20"
                            color="#4fa94d"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="three-circles-rotating"
                            outerCircleColor="black"
                            innerCircleColor="black"
                            middleCircleColor="black"
                        />
                        }
                    </div>
                </button>
            </form>
        </div>
    )
}

export default Create