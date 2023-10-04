import React, { useEffect, useState } from 'react'
import { BASE_URL } from './Vendorlist'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

function Updatevendor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.isloading);
    const { _id } = useParams()

    const [formData, setFormData] = useState({})

    useEffect(() => {
        dispatch({ type: 'DATALOADING' })
        axios.get(`${BASE_URL}/vendor/${_id}`)
            .then((res) => {
                setFormData(res.data)
                dispatch({ type: 'DATALOADED' })
            })
    }, [])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'DATALOADING' })
        axios.put(`${BASE_URL}/vendor/update/${_id}`, formData)
            .then(() => {
                dispatch({ type: 'NOERROR' })
                dispatch({ type: 'DATALOADED' })
                navigate('/');
            }).catch((err) => {
                dispatch({ type: 'FETCHERROR' })
            })
    }

    return (
        <div className='w-full flex justify-center'>
            <form onSubmit={handleSubmit} className='w-[80%] md:w-[56%] lg:w-[30%] mt-10 flex flex-col gap-4'>
                <h3 className='text-xl font-semibold'>Update vendor</h3>
                <input type="text" name='vendor_name' value={formData.vendor_name} required placeholder='Vendor Name' onChange={handleChange} />
                <input type="number" name='bank_account' value={formData.bank_account} required placeholder='Bank Account No' onChange={handleChange} />
                <input type="text" name='bank_name' value={formData.bank_name} required placeholder='Bank Name' onChange={handleChange} />
                <input type="text" name='address_1' value={formData.address_1} placeholder='Address Line 1' onChange={handleChange} />
                <input type="text" name='address_2' value={formData.address_2} placeholder='Address Line 2' onChange={handleChange} />
                <input type="text" name='city' value={formData.city} placeholder='City' onChange={handleChange} />
                <input type="text" name='country' value={formData.country} placeholder='Country' onChange={handleChange} />
                <input type="number" name='zip_code' value={formData.zip_code} placeholder='Zip Code' onChange={handleChange} />
                <button type="submit" disabled={isLoading} className='bg-slate-800 text-white font-semibold flex items-center justify-center py-2 gap-6 rounded-full'>
                    <span className='w-[60%] text-right'>Update</span>
                    <div className='w-[40%]'>
                        {
                            isLoading && <ThreeCircles
                                height="20"
                                width="20"
                                color="#4fa94d"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="three-circles-rotating"
                                outerCircleColor="white"
                                innerCircleColor="white"
                                middleCircleColor="white"
                            />
                        }
                    </div>
                </button>
            </form>
        </div>
    )
}

export default Updatevendor