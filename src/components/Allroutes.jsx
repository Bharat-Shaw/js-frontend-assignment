import React from 'react'
import Vendorlist from './Vendorlist'
import { Route, Routes } from 'react-router-dom'
import Create from './Create'
import Updatevendor from './Updatevendor'

function Allroutes() {
    return (
        <Routes>
                <Route path="/" element={<Vendorlist />} />
                <Route path="/update/:_id" element={<Updatevendor />} />
                <Route path="/create" element={<Create />} />
                {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
    )
}

export default Allroutes