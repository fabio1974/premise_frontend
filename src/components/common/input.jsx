import React from 'react';


export const Input = ({name,label,error,type,options,...rest}) => {
    const opt = options.map((op,index)=> <option key={index} value={op._id}>{op.name}</option>)
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {type !== 'select' && <input name={name} id={name} type={type} {...rest} className="form-control"/>}
            {type === 'select' &&
                <select name={name} id={name} {...rest} className="form-control">{opt}</select>}
            {error && <div className="badge badge-danger">{error}</div>}
        </div>
    )
}


export const Checkbox = ({name,label,error,type,options,...rest}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <checkbox name={name} id={name} {...rest} className="form-control"/>}
        </div>
    )
}



