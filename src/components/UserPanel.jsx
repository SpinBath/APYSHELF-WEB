import axios from 'axios';

import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { createUser, loginUser } from '../api/user.api'

import React, { useState } from 'react';




export function SinginPanel() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit(async data => {

        try {

            const res = await loginUser(data);
            console.log(res)

            if (res.status = 200) {
                navigate("/home");
            }

        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.error('Error en Axios:', error.message);
                console.error('Código de estado:', error.response?.status); // 404
                console.error('URL:', error.config.url);
            } else {
                console.error('Error desconocido:', error);
            }
        }

    });



    return (
        <div className="div-signin">
            <a href="/"><img id="img-logo" src="../src/img/apyshelf-logo.png" /></a>
            <h1>APYSHELF</h1>
            <form onSubmit={onSubmit}>
                <div class="div-inputs">
                    {errors.email && <p class="error">{errors.email.message}</p>}
                    <input type="email" id="email" placeholder="Email" {...register("email")} required />
                </div>
                <div class="div-inputs">
                    <input type="password" id="password" placeholder="Password" {...register("password")} required />
                </div>
                <button id="btn-login">LOGIN</button>
            </form>
            <p id="p-createaccount"><a href="/signon">Create account</a></p>
        </div>
    );

}

export function SingonPanel() {

    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm()

    const handlePhoneInput = (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    };

    const onSubmit = handleSubmit(async data => {

        try {

            const res = await createUser(data);

            console.log(res)

            if (res.success) {
                navigate("/signin");
            }

        } catch (error) {

            if (error.response) {

                if (error.response.status === 404) {
                    console.error('La ruta no fue encontrada (404).');

                } else {
                    console.error('Error del servidor:', error.response.status, error.response.data);

                    if (error.response.data.email) {
                        setError("email", {
                            type: "server",
                            message: "already exists",
                        });

                        const emailInput = document.getElementById('email')
                        emailInput.style.borderColor = 'red'

                    }


                    if (error.response.data.national_id) {
                        setError("national_id", {
                            type: "server",
                            message: "already exists",
                        });

                        const national_id = document.getElementById('national_id')
                        national_id.style.borderColor = 'red'

                    }


                }

            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);

            } else {
                // Algo más causó el error
                console.error('Error al configurar la solicitud:', error.message);
            }

        }

    });

    return (
        <div className="div-signon">
            <a href="/"><img id="img-logo" src="../src/img/apyshelf-logo.png" /></a>
            <h1>APYSHELF</h1>

            <form onSubmit={onSubmit}>

                <div class="div-inputs">
                    {errors.email && <p class="error">{errors.email.message}</p>}
                    <input type="email" id="email" placeholder="Email" {...register("email")} required />
                </div>
                <div class="div-inputs">
                    <input type="password" id="password" placeholder="Password" {...register("password")} required />
                </div>

                <div class="div-inputs">
                    <input type="name" id="name" placeholder="Name" {...register("name")} required />

                    <input type="middlename" id="middlename" placeholder="Middle Name" {...register("middlename")} required />
                </div>

                <div class="div-inputs">
                    {errors.national_id && <p class="error">{errors.national_id.message}</p>}
                    <input type="national_id" id="national_id" placeholder="DNI" {...register("national_id")} required />
                </div>
                <div class="div-inputs">
                    {errors.phone && <p class="error">{errors.phone.message}</p>}
                    <input type="tel" id="phone" placeholder="Phone" {...register("phone", { pattern: { value: /^[6-7]\d{8}$|^[8-9]\d{8}$/, message: "Invalid Phone" } })} onInput={handlePhoneInput} required />
                </div>

                <button id="btn-login" type="submit"> Create account </button>

            </form>

            <p id="p-createaccount"><a href="/signin">Sign in</a></p>

        </div>
    );



}



