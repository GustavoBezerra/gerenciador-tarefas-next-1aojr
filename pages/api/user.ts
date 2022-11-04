import type {NextApiRequest, NextApiResponse} from 'next';
import { connectToDB } from '../../middlewares/connectToDB';
import { UserModel } from '../../models/User';
import { DefaultMessageRespose } from '../../types/DefaultMessageRespose';
import { User } from '../../types/User';
import CryptoJS from "crypto-js";

const endpoint = async (req: NextApiRequest, res: NextApiResponse<DefaultMessageRespose>) => {

    try{
        if(req.method !== 'POST'){
            return res.status(405).json({error: 'Método informado não existe!'});
        }

        const {MY_SECRET_KEY} = process.env;
        if(!MY_SECRET_KEY){
            return res.status(500).json({error: 'Não foi informada a secretKey'});
        }
    
        if(!req.body){
            return res.status(400).json({error: 'Favor informar os dados para cadastro'});
        }

        const user = req.body as User;

        if(!user.name || user.name.length < 2){
            return res.status(400).json({error: 'Nome não é válido.'});    
        }

        if(!user.email || user.email.length < 6){
            return res.status(400).json({error: 'E-mail não é válido.'});    
        }

        if(!user.password || user.password.length < 6){
            return res.status(400).json({error: 'Senha não é válida.'});    
        }

        const existsWithSameEmail = await UserModel.find({email: user.email});
        if(existsWithSameEmail && existsWithSameEmail.length > 0){
            return res.status(400).json({error: 'E-mail já cadastrado.'});
        }

        user.password = CryptoJS.AES.encrypt(user.password, MY_SECRET_KEY).toString();
        
        await UserModel.create(user);

        return res.status(400).json({msg: 'Usuário cadastrado'});
    } catch(e : any){
        console.log('Ocorreu erro ao cadastrar usuário:', e);
        return res.status(500).json({error: 'Ocorreu erro ao cadastrar usuário, tente novamente...'});
    }
    
}

export default connectToDB(endpoint);