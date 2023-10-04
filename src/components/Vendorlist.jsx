import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export const BASE_URL = "https://eager-dragonfly.cyclic.cloud";

function Vendorlist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [vendorname, setvendorname] = useState();
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const vendorArr = useSelector(state => state.vendorList);
    const isLoading = useSelector(state => state.isloading);
    const totalpage = useSelector(state => state.totalpage);
    const error = useSelector(state => state.isError);
    

    let pagearr = [];
    for (let i = 0; i < totalpage; i++) {
        pagearr.push(i);
    }

    const fetchData = () => {
        dispatch({ type: 'DATALOADING' })
        axios.get(`${BASE_URL}/vendor?page=${currentPage}&limit=5`)
            .then((res) => {
                dispatch({ type: 'TOTALPAGE', payload: res.data.paginationInfo.totalPages })
                dispatch({ type: 'ARRAY_LIST', payload: res.data.vendorlist })
                dispatch({ type: 'DATALOADED' })
            })
    }

    const handleDelete = (_id) => {
        dispatch({ type: 'DATALOADING' })
        axios.delete(`${BASE_URL}/vendor/delete/${_id}`)
            .then(() => {
                fetchData()
            }).catch(() => {
                dispatch({ type: 'DATALOADED' })
            })
    }

    useEffect(() => {
        fetchData()
    }, [currentPage]);

    if (isLoading) {
        return <div className='w-full h-[70vh] flex justify-center items-center'>
            <ThreeCircles
                height="100"
                width="80"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="gray"
                innerCircleColor="black"
                middleCircleColor="gray"
            />
        </div>
    }

    return (
        <div className='w-full flex flex-col justify-center items-center mt-14'>

            {/* table  */}
            <table className="table-auto w-[60%]">
                <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>Bank Account No.</th>
                        <th>Bank Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vendorArr?.map((item, i) => {
                            return <tr key={i}>
                                <td>{item.vendor_name}</td>
                                <td>{item.bank_account}</td>
                                <td>{item.bank_name}</td>
                                <td>
                                    <div className='flex justify-center gap-4'>
                                        <svg onClick={() => {
                                            navigate(`/update/${item._id}`)
                                        }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer">
                                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        <svg onClick={() => {
                                            // handleDelete(item._id);
                                            setvendorname(item)
                                            setShowModal(true)
                                        }} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 cursor-pointer text-red-600">
                                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <br />

            {/* pages  */}
            <div className='mt-[20px] flex gap-7'>
                <button disabled={currentPage == 1}
                    className={`font-semibold ${currentPage == 1 ? 'cursor-not-allowed text-slate-500' : ''}`}
                    onClick={() => { setCurrentPage((prev) => prev - 1) }}>Prev</button>
                {
                    pagearr.map((el) => {
                        return <button key={el} disabled={currentPage == el + 1}
                            onClick={() => { setCurrentPage(el + 1) }}
                            className={`${currentPage == el + 1 ? 'text-white bg-slate-500 cursor-not-allowed' : 'text-white bg-slate-800'} rounded-full px-3 py-1 `}>
                            {el + 1}
                        </button>
                    })
                }
                <button disabled={pagearr.length <= 1}
                    className={`font-semibold ${pagearr.length <= 1 ? 'cursor-not-allowed text-slate-500' : ''}`}
                    onClick={() => { setCurrentPage((prev) => prev + 1) }}>Next</button>
            </div>

            {/* dialogue box  */}
            <div>
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-lg">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="relative p-6 flex-auto">
                                        <p className="my-2 text-slate-500 text-lg leading-relaxed">
                                            Do you want to delete <br />{vendorname.vendor_name}?
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-around p-2 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                setShowModal(false)
                                                handleDelete(vendorname._id)
                                            }}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div>

        </div>
    )
}

export default Vendorlist;

