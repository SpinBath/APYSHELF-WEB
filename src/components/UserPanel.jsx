import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { createUser } from '../api/user.api'
import React, { useState } from 'react';




export function SinginPanel() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit(async data => {

        try {

            const res = await createUser(data);

            if (res.success) {
                navigate("/home");
            }
            
        } catch (error) {

            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.email ? error.response.data.email[0] : "Error al registrar el usuario.";
                const errorMessage2 = error.response.data.national_id ? error.response.data.national_id[0] : "Error al registrar el usuario.";


                console.log(errorMessage);
                console.log(errorMessage2);

            } else {
                console.log("Hubo un error al procesar la solicitud.");
            }
        }

    });



    return (
        <div className="div-signin">
            <a href="/"><img id="img-logo" src="../src/img/apyshelf-logo.png" /></a>
            <h1>APYSHELF</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Gmail"></input>
                <input type="text" placeholder="Password"></input>
                <button id="btn-login">LOGIN</button>
            </form>
            <p id="p-createaccount"><a href="/signon">Create account</a></p>
        </div>
    );

}
















export function SingonPanel() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit(async data => {

        try {

            const res = await createUser(data);

            if (res.success) {
                navigate("/home");
            }
            
        } catch (error) {

            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.email ? error.response.data.email[0] : "Error al registrar el usuario.";
                const errorMessage2 = error.response.data.national_id ? error.response.data.national_id[0] : "Error al registrar el usuario.";


                console.log(errorMessage);
                console.log(errorMessage2);

            } else {
                console.log("Hubo un error al procesar la solicitud.");
            }
        }

    });

    return (
        <div className="div-signon">
            <a href="/"><img id="img-logo" src="../src/img/apyshelf-logo.png" /></a>
            <h1>APYSHELF</h1>

            <form onSubmit={onSubmit}>

                <input type="hidden" name="csrfmiddlewaretoken" value="{{ csrf_token }}" />

                <input type="email" id="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
                {errors.email && <p>{errors.email.message}</p>} {/* Mensaje de error */}

                <input type="password" id="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
                {errors.password && <p>{errors.password.message}</p>} {/* Mensaje de error */}

                <input type="first_name" id="first_name" placeholder="Name" {...register("first_name", { required: "first_name is required" })} />
                {errors.first_name && <p>{errors.first_name.message}</p>} {/* Mensaje de error */}

                <input type="middle_name" id="middle_name" placeholder="Middle Name" {...register("middle_name", { required: "middle_name is required" })} />
                {errors.middle_name && <p>{errors.middle_name.message}</p>} {/* Mensaje de error */}

                <input type="national_id" id="national_id" placeholder="DNI" {...register("national_id", { required: "national_id is required" })} />
                {errors.national_id && <p>{errors.national_id.message}</p>} {/* Mensaje de error */}

                <input type="phone" id="phone" placeholder="Phone" {...register("phone", { required: "phone is required" })} />
                {errors.phone && <p>{errors.phone.message}</p>} {/* Mensaje de error */}

                <button id="btn-login" type="submit"> Create account </button>

            </form>

            <p id="p-createaccount"><a href="/signin">Sign in</a></p>

        </div>
    );

}


