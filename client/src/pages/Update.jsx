import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: "",
        desc: "",
        cover: "",
        price: null
    })
    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {

            await axios.put(`http://localhost:8000/books/${id}`, book)
            navigate("/");
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='form'>
            <h1>Edit Book</h1>
            <input type="text" placeholder='title' onChange={handleChange} name="title" />
            <input type="text" placeholder='description' onChange={handleChange} name="desc" />
            <input type="text" placeholder='cover' onChange={handleChange} name="cover" />
            <input type="number" placeholder='price' onChange={handleChange} name="price" />
            <button className='formbtn' onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update