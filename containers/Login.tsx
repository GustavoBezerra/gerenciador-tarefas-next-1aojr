import type { NextPage } from "next";
import { useState } from "react";
import { executeRequest } from "../services/api";
import { Modal } from "react-bootstrap";

type LoginProps = {
    setToken(s: string): void
}

export const Login: NextPage<LoginProps> = ({setToken}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [cadastro, setCadastro] = useState(false);
    const [showModal, setShowModal] = useState(true);

    const doLogin = async () => {
        try{
            setError('');
            if(!login || !password){
                setError('Favor preencher os campos!');
                return
            }

            setLoading(true);

            const body = {
                login,
                password
            };

            const result = await executeRequest('login', 'post', body);
            if(result && result.data){
                const obj = result.data;
                localStorage.setItem('accessToken',obj.token);
                localStorage.setItem('name',obj.name);
                localStorage.setItem('email',obj.email);
                setToken(obj.token);
            }
        }catch(e : any){
            console.log(`Erro ao efetuar login: ${e}`);
            if(e?.response?.data?.error){
                setError(e.response.data.error);
            }else{
                setError(`Erro ao efetuar login, tente novamente.`);
            }
        }

        setLoading(false);
    }

    const doSignup = async () => {
        try{
            setError('');
            if(!login || !password || !name){
                setError('Favor preencher os campos!');
                return
            }

            setLoading(true);

            const email = login;

            const body = {
                name,
                email,
                password
            };

            const result = await executeRequest('user', 'post', body);
            if(result){
                setShowModal(true);
            }
        }catch(e : any){
            console.log(`Erro ao efetuar cadastro: ${e}`);
            if(e?.response?.data?.error){
                setError(e.response.data.error);
            }else{
                setError(`Erro ao efetuar cadastro, tente novamente.`);
            }
        }

        setLoading(false);
    }

    const closeModal = () => {
        setShowModal(false);
        clearValues();
        setCadastro(false);
    }

    const signup = async() => {
        clearValues();
        setCadastro(true);
    }

    const backTologin = async() => {
        clearValues();
        setCadastro(false);
    }

    function clearValues() {
        setName('');
        setLogin('');
        setPassword('');
    }

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <div className="form">
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                 {!cadastro &&
                     <div>
                         <div className="input">
                             <img src="/mail.svg" alt="Login Icone" />
                             <input type='text' placeholder="Login"
                                 value={login}
                                 onChange={evento => setLogin(evento.target.value)}
                             />
                         </div>
                         <div className="input">
                             <img src="/lock.svg" alt="Senha Icone" />
                             <input type='password' placeholder="Senha"
                                 value={password}
                                 onChange={evento => setPassword(evento.target.value)}
                             />
                         </div>
                         <button onClick={doLogin} disabled={loading}>{loading ? '...Carregando': 'Login'}</button>
                         <div className="signup">
                             <span>Não possui conta?</span> <a onClick={signup}>Crie aqui</a>
                         </div>
                     </div>
                 }
                 {cadastro &&
                     <div>
                         <div className="input">
                             <img src="/user.svg" alt="Nome" />
                             <input type='text' placeholder="Nome"
                                 value={name}
                                 onChange={evento => setName(evento.target.value)}
                             />
                         </div>
                         <div className="input">
                             <img src="/mail.svg" alt="Login Icone" />
                             <input type='text' placeholder="Login"
                                 value={login}
                                 onChange={evento => setLogin(evento.target.value)}
                             />
                         </div>
                         <div className="input">
                             <img src="/lock.svg" alt="Senha Icone" />
                             <input type='password' placeholder="Senha"
                                 value={password}
                                 onChange={evento => setPassword(evento.target.value)}
                             />
                         </div>
                         <button onClick={doSignup} disabled={loading}>{loading ? '...Carregando': 'Cadastrar'}</button>
                         <div className="signup">
                             <a onClick={backTologin}>Voltar</a>
                         </div>
                     </div>
                 }
                 <Modal show={showModal} className="container-modal">
                    <Modal.Body>
                        <p>Cadastro concluído</p>
                        <span>Seu cadastro foi feito com sucesso! Por favor, efetue o login.</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="button button-close col-12">
                            <button onClick={closeModal}>Fechar</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}