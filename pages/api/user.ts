import type {NextApiRequest, NextApiResponse} from 'next';
import { connectToDB } from '../../middlewares/connectToDB';
import { DefaultMessageRespose } from '../../types/DefaultMessageRespose';
import { User } from '../../types/User';

const endpoint = function(req: NextApiRequest, res: NextApiResponse<DefaultMessageRespose>){

    try{
        if(req.method !== 'POST'){
            return res.status(405).json({error: 'Método informado não existe!'});
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

        return res.status(400).json({error: 'Usuário cadastrado'});
    } catch(e : any){
        console.log('Ocorreu erro ao cadastrar usuário:', e);
        return res.status(500).json({error: 'Ocorreu erro ao cadastrar usuário, tente novamente...'});
    }
    
}

export default connectToDB(endpoint);