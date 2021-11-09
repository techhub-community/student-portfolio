import React from 'react'
import "./WorkCard.css"
function WorkCard({title,description,thumb,url}) {
    return (
        <a href={url}>
        <div className="work-card rounded hover:scale-105 transform transition-all">
            <div className="work-card-thumb">
                <img src={thumb} alt="workcardthumb" className="rounded"/>
            </div>

            <div className="work-card-footer px-2 py-2">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
        </a>
    )
}

export default WorkCard
