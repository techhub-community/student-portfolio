import React from 'react'
import { Link } from 'react-router-dom'
import "./Card.css"
function Card({title,description,upload_by,thumb,url}) {

    
    return (
        <div className="lg:flex gap-5 rounded person-card dark:bg-gray-700 group overflow-hidden">
            <img src={thumb} alt="work-thumb" className="sm:w-full xl:w-32 transform hover:scale-105 transition-all object-cover"/>
            <div className="card-content py-2">
                <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
                <p className="text-gray-500 dark:text-gray-50">{description}</p>
                <div className="flex gap-2 flex-wrap">
                <Link to={`/user/${upload_by}`} className="flex items-center justify-center mt-2 font-semibold rounded text-white work-button hover:bg-gray-400">Author</Link>
                <a href={url} className="flex items-center justify-center mt-2 font-semibold rounded text-white work-button hover:bg-gray-400">View Work</a>
                </div>
            </div>
        </div>
    )
}

export default Card
