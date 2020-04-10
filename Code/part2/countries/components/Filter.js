import React from "react";



const Filter = ({ value, handleFilter }) => {
    return (
        <div>
            Find countries:
            <form>
                <input value={value}
                    onChange={handleFilter} />
            </form>
        </div>
    )
}

export default Filter;
