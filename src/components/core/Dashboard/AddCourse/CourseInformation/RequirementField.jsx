import React, { useEffect, useState } from 'react'

function RequirementField({
    name,
    label,
    register,
    setValue,
    getValues,
    errors,
}) {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        register(name, {required: true});
    }, [])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement])
            setRequirement("")
        }
    }

    const handleRemoveRequirement = () => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1)
        setRequirementList(updatedRequirementList);
    }

  return (
    <div>
    
        <label htmlFor={name}>{label}<sup>*</sup></label>

        <div>
            <input 
                type='text'
                id={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='w-full text-white'
            />
            <button
                type='submit'
                onClick={handleAddRequirement}
            >
                Add
            </button>
        </div>

        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement, index) => {
                            <li key={index}
                                className='flex flex-col items-center text-richblack-5 gap-y-5'
                            >
                                <span>{requirement}</span>
                                <button 
                                    onClick={() => handleRemoveRequirement(index)}
                                    className='text-xs text-pure-greys-300'
                                >
                                    Clear
                                </button>
                            </li>
                        })
                    }
                </ul>
            )
        }

        {errors[name] && <span>{label} is required</span>}
    
    </div>
  )
}

export default RequirementField