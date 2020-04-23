import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/FilterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
        const filter = event.target.value
        props.setFilter(filter)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    var filter = state.filter
    return {
        filter: filter
    }
}

const mapDispatchToProps = {
    setFilter
}

const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
    )(Filter)

export default ConnectedFilter