import React from "react";



const Filter = ({ value, handleFilter }) => {
    return (
        <div>
            Filter shown with:

            <form>
                <input value={value}
                    onChange={handleFilter} />
            </form>
        </div>
    )
}

export default Filter;
