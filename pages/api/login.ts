import type {NextApiRequest, NextApiResponse} from 'next';
import { connectToDB } from '../../middlewares/connectToDB';
import { jwtValidator } from '../../middlewares/jwtValidator';
import { UserModel } from '../../models/User';
import { DefaultMessageRespose } from '../../types/DefaultMessageRespose';
import { User } from '../../types/User';
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';

const login = async function(requisicao: NextApiRequest, resposta: NextApiResponse<DefaultMessageRespose | any>){

    try{
        if(requisicao.method !== 'POST'){
            return resposta.status(405).json({error: 'Método informado não existe!'});
        }

        const {MY_SECRET_KEY} = process.env;
        if(!MY_SECRET_KEY){
            return resposta.status(500).json({error: 'Não foi informada a secretKey'});
        }
    
        if(!requisicao.body){
            return resposta.status(400).json({error: 'Favor informar os dados para autenticação'});
        }
    
        const {login, password} = requisicao.body;

        if(!login || !password){
            return resposta.status(400).json({error: 'Favor informar os dados para autenticação'});
        }

        const existsUserWithEmail = await UserModel.find({email: login});

        if(!existsUserWithEmail || existsUserWithEmail.length === 0){
            return resposta.status(400).json({error: 'Usuário e senha não conferem (login nao encontrado)'});
        }

        const user = existsUserWithEmail[0] as User;
        var bytes = CryptoJS.AES.decrypt(user.password, MY_SECRET_KEY);
        var savedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if(password === savedPassword){
            const token = jwt.sign({_id: user.id}, MY_SECRET_KEY);

            const result = {
                token,
                name: user.name,
                email: user.email
            }
            return resposta.status(200).json(result);
        }

        return resposta.status(400).json({error: 'Usuário e senha não conferem (senha nao confere)'});
        
        
    } catch(e : any){
        console.log('Ocorreu erro ao logar usuário:', e);
        return resposta.status(500).json({error: 'Ocorreu erro ao logar usuário, tente novamente...'});
    }
    
}

export default connectToDB(login);