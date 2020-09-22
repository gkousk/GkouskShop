import React from 'react';
const Categories = ({ category }) => {
    return (
        <div className="col s6 m6 l4">
        <div className="card" id="categcard">
        <div className="card-image">
            <img  alt="" className="activator" src={category.image}></img>
        </div>
        <div className="card-content grey">
          <h6>{category.name}</h6>
        </div>
      </div>
        </div>
            

         
     
    )
}
export default Categories;