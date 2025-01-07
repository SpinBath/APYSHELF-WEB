import axios from 'axios';

import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useAuth } from '../AuthContext';
import { createUser, loginUser, infoUser } from '../api/user.api'
import React, { useState } from 'react';

import "./styles/UserPanel.css"





export function SinginPanel() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm()




    const onSubmit = handleSubmit(async data => {

        try {

            const res = await loginUser(data);

            console.log('Token obtenido:', res.data.token);
            localStorage.setItem('token', res.data.token);

            if (res.status === 200) {
                login(res.data.token);
                navigate("/account");
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
                <div className="div-inputs">
                    {errors.email && <p className="error">{errors.email.message}</p>}
                    <input type="email" id="email" placeholder="Email" {...register("email")} required />
                </div>
                <div className="div-inputs">
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

    const onSubmit = handleSubmit(async data => {

        try {

            const res = await createUser(data);

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

    const handlePhoneInput = (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    };

    return (
        <div className="div-signon">
            <a href="/"><img id="img-logo" src="../src/img/apyshelf-logo.png" /></a>
            <h1>APYSHELF</h1>

            <form onSubmit={onSubmit}>

                <div className="div-inputs">
                    {errors.email && <p className="error">{errors.email.message}</p>}
                    <input type="email" id="email" placeholder="Email" {...register("email")} required />
                </div>
                <div className="div-inputs">
                    <input type="password" id="password" placeholder="Password" {...register("password")} required />
                </div>

                <div className="div-inputs">
                    <input type="name" id="name" placeholder="Name" {...register("name")} required />

                    <input type="middlename" id="middlename" placeholder="Middle Name" {...register("middlename")} required />
                </div>

                <div className="div-inputs">
                    {errors.national_id && <p className="error">{errors.national_id.message}</p>}
                    <input type="national_id" id="national_id" placeholder="DNI" {...register("national_id")} required />
                </div>
                <div className="div-inputs">
                    {errors.phone && <p className="error">{errors.phone.message}</p>}
                    <input type="tel" id="phone" placeholder="Phone" {...register("phone", { pattern: { value: /^[6-7]\d{8}$|^[8-9]\d{8}$/, message: "Invalid Phone" } })} onInput={handlePhoneInput} required />
                </div>

                <button id="btn-login" type="submit"> Create account </button>

            </form>

            <p id="p-createaccount"><a href="/signin">Sign in</a></p>

        </div>
    );



}


export function AccoutInfo() {

    const navigate = useNavigate();
    const [user, setUsers] = useState([]);
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/main");
    };

    useState(() => {

        async function loadUser() {
            const user = await infoUser(localStorage.getItem('token'));
            setUsers(user.data)
        }

        loadUser();

    }, []);




    return (

        <div id="userInfo" user={user}>
            <div id="divUserImage">
                <div id="divinfo">
                    <img id="imgUserPhoto">{user.photo}</img><br />
                    <button id="btnEditProfile">EDIT PROFILE</button><br />
                    <button id="btnLogout" onClick={handleLogout} >logout</button><br />
                </div>
            </div>

            <div id="divUserInfo">
                <p id="pUserName">{user.name} {user.middlename} {user.lastname}</p>
                <p id="pUserEmail">{user.email}</p>
                <p id="pUserNationalId">DNI: {user.national_id}</p>
                <p id="pUserPhone">TLF: {user.phone}</p>
                <p id="pUserAddress">ADR: </p>
            </div>
        </div>


    );
}

export function EditAccoutInfo() {


    const [user, setUsers] = useState([]);
    const { logout } = useAuth();

    useState(() => {

        async function loadUser() {
            const user = await infoUser(localStorage.getItem('token'));
            setUsers(user.data)
        }

        loadUser();

    }, []);




    return (

        <div id="userInfo" user={user}>
            <div id="divUserImage">
                <div id="divinfo">
                    <img id="imgUserPhoto">{user.photo}</img><br />
                    <button id="btnEditProfile">EDIT PROFILE</button><br />
                    <button id="btnLogout" onClick={logout} >logout</button><br />
                </div>
            </div>

            <div id="divUserInfo">
                <p id="pUserName">{user.name} {user.middlename} {user.lastname}</p>
                <p id="pUserEmail">{user.email}</p>
                <p id="pUserNationalId">DNI: {user.national_id}</p>
                <p id="pUserPhone">TLF: {user.phone}</p>
                <p id="pUserAddress">ADR: </p>
            </div>
        </div>


    );
}



