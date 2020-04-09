import React from "react";


const Total = ({ parts }) => {

    const total = parts.map(x => x.exercises).reduce((s, p) => {return s + p}, 0)
    // const total = parts.reduce(function(s, p) { return s + p.exercises}, 0)
    return <p> Total: {total} </p>

}

export default Total; 