import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CountryCode from "../../../data/countrycode.json"

function ContactUsForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log(data);
    try{
        setLoading(true)
        //api call -> backend ki api call for later
        const response = {status: "OK"}
        console.log(response)
        setLoading(false);
    }catch(error){
        console.log(error.message)
        setLoading(false);
    }
  }

  useEffect( () => {
    if(isSubmitSuccessful) {
        reset({
            email: "",
            firstname: "",
            lastname: "",
            message: "",
            phonenumber: ""
        })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-14">
        {/* name */}
        <div className="flex gap-x-5">
          {/* firstname */}
          <div className="flex flex-col">
            <label htmlFor="firstname">First Name</label>
            <input
              className="text-black"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && <span>Please enter you firstname</span>}
          </div>
          {/* lastname */}
          <div className="flex flex-col">
            <label htmlFor="lastname">Last Name</label>
            <input
              className="text-black"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && <span>Please enter you lastname</span>}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            id="email"
            className="text-black"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please enter your email address</span>}
        </div>

        {/* phone -> panding */}
        <div className="flex flex-col gap-x-10">
          <label htmlFor="phonenumber">Phone Number</label>
          
          <div className="flex gap-x-5">

            {/* dropdown */}

            <select 
              name="dropdown"
              id="dropdown"
              className="text-black w-[80px]"
              {...register("countrycode", {required: true})}
            >
              {
                CountryCode.map((element, index) => {
                  return (
                    <option key={index} value={element.code}>
                      {element.code} - {element.country}
                    </option>
                  )
                })
              }
            </select>

            {/* input */}

            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              className="text-black"
              placeholder="1234 6789"
              {...register("phonenumber", {
                required: {value: true, message: "Please enter phone number"},
                maxLength: {value: 10, message: "Invalid Phone number"},
                minLength: {value: 8, message: "Invalid Phone number"},
              }
              )}
            />
          </div>

          {
            errors.phonenumber && <span>{errors.phonenumber.message}</span>
          }
        </div>

        {/* message */}
        <div className="flex flex-col">
          <label htmlFor="message">Message</label>

          <textarea
            className="text-black"
            name="message"
            id="message"
            cols={30}
            rows={7}
            placeholder="Enter your message here"
            {...register("message", { required: true })}
          />
          {errors.message && <span>Please enter your message</span>}
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="rounded-md bg-yellow-50 text-center px-6 py-3 text-[16px] font-semibold text-black"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}

export default ContactUsForm;
