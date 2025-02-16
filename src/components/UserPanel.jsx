import axios from 'axios';

import { useNavigate, Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useAuth } from '../AuthContext';
import { createUser, loginUser, infoUser, editUser } from '../api/user.api'
import React, { useRef, useState, useEffect } from 'react';

import "./styles/UserInfoEdit.css"
import "./styles/UserInfo.css"






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
                console.error('Código de estado:', error.response?.status);
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

    const fileInputRef = useRef(null);

    const { logout } = useAuth();



    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {


        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB

            if (file && file.size < maxSizeInBytes) {
                const data = new FormData();
                data.append("profile_image", file);
                const ed = await editUser(user.id, data);

                if (ed.status === 200) {
                    navigate("/account")
                }
            } else {
                console.log("Image Size: ", file.size)
            }

        }
    };


    const handleLogout = () => {
        logout();
        navigate("/main");
    };

    useState(() => {

        async function loadUser() {
            const user = await infoUser(localStorage.getItem('token'));
            console.log(user.data.profile_image)
            setUsers(user.data)
        }

        loadUser();

    }, []);

    const changueProfileImage = () => {
        console.log("asd")
    }

    return (

        <div id="userInfo" user={user}>
            <div id="divUserImage">
                <div id="divinfo">
                    <img src={`http://127.0.0.1:8000/media/${user.profile_image}`} id="imgUserPhoto" onClick={changueProfileImage} />
                    <div id="div-image" onClick={handleDivClick}><input type='file' accept="image/png, image/jpeg, image/svg+xml" ref={fileInputRef} onChange={handleFileChange} /></div>

                    <br />
                    <Link to="/editaccount"><button id="btnEditProfile">EDIT PROFILE</button> </Link><br />
                    <button id="btnLogout" onClick={handleLogout} >logout</button><br />
                </div>
            </div>

            <div id="divUserInfo">
                <p id="pUserName">{user.name} {user.middlename} {user.lastname}</p>
                <p id="pUserEmail">{user.email}</p>
                <p id="pUserNationalId">DNI: {user.national_id}</p>
                <p id="pUserPhone">TLF: {user.phone}</p>
            </div>
        </div>


    );
}



export function EditAccoutInfo() {

    const navigate = useNavigate();
    const [user, setUsers] = useState([]);

    useState(() => {
        async function loadUser() {
            const userData = await infoUser(localStorage.getItem("token"));
            setUsers(userData.data);
        }

        loadUser();
    }, []);



    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm();

    useEffect(() => {
        if (user) {
            setValue("email", user.email || "");
            setValue("name", user.name || "");
            setValue("middlename", user.middlename || "");
            setValue("lastname", user.lastname || "");
            setValue("national_id", user.national_id || "");
            setValue("phone", user.phone || "");
        }
    }, [user, setValue]);

    const onSubmit = handleSubmit(async (data) => {


        try {

            const updatedData = { ...data };
            const ed = await editUser(user.id, updatedData);
            if (ed.status === 200) {
                navigate("/account")
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
                console.error('Error al configurar la solicitud:', error.message);
            }

        }

    });

    const handlePhoneInput = (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    };

    return (

        <div id="edituserinfo" user={user}>
            <h1>Edit Profile</h1>
            <form onSubmit={onSubmit}>

                <div className="div-inputs">
                    <input type="email" id="email" placeholder="Email" defaultValue={user?.email || ""} {...register("email")} required />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div className="div-inputs">
                    <input type="name" id="name" placeholder="Name" defaultValue={user?.name || ""} {...register("name")} required />
                </div>

                <div className="div-inputs">
                    <input type="middlename" id="middlename" placeholder="Middle Name" defaultValue={user?.middlename || ""} {...register("middlename")} required />
                </div>

                <div className="div-inputs">
                    <input type="lastname" id="lastname" placeholder="Last Name" defaultValue={user?.lastname || ""} {...register("lastname")} />
                </div>

                <div className="div-inputs">
                    <input type="national_id" id="national_id" placeholder="DNI" defaultValue={user?.national_id || ""} {...register("national_id")} required />
                    {errors.national_id && <p>{errors.national_id.message}</p>}
                </div>
                <div className="div-inputs">
                    <input type="tel" id="phone" placeholder="Phone" defaultValue={user?.phone || ""} {...register("phone", { pattern: { value: /^[6-7]\d{8}$|^[8-9]\d{8}$/, message: "Invalid Phone" } })} onInput={handlePhoneInput} required />
                </div>

                <button id="btn-editProfile" type="submit"> Apply </button><br />
                <Link to="/account"><button id="btn-back" type='button'> Back </button></Link>
            </form>
        </div>
    );
}



