
import React from "react";

import Header from "./Header";
import Part from "./Part";
import Total from "./Total";



const Course = ({ course }) => {

    const { name, parts } = course;
    const parts_print = parts.map(part => <Part key={part.id} part={part} />)
  
    return (
      <div>
        <Header name={name} />
        {parts_print}
        <Total parts={parts} />
      </div>
    )
  }