import type {NextApiRequest, NextApiResponse} from 'next';
import { connectToDB } from '../../middlewares/connectToDB';
import { jwtValidator } from '../../middlewares/jwtValidator';
import { TaskModel } from '../../models/Task';
import { DefaultMessageRespose } from '../../types/DefaultMessageRespose';
import { Task } from '../../types/Task';
import { findAllTasksByUserId, saveTask } from '../../services/taskServices';

const endpoint = async (req: NextApiRequest, res: NextApiResponse<DefaultMessageRespose | any>) => {

    try{
        if(req.method === 'GET'){
            return getTasks(req, res);
        } else if(req.method === 'POST'){
            return createTask(req, res);
        }
        
    } catch(e : any){
        console.log('Ocorreu erro ao listar tarefas do usuário:', e);
        return res.status(500).json({error: 'Ocorreu erro ao listar tarefas do usuário, tente novamente...'});
    }
    
}

const getTasks = async(req: NextApiRequest, res: NextApiResponse<DefaultMessageRespose | any>) => {
    const tasks = await findAllTasksByUserId(req.query.userId);
       
    return res.status(200).json({tasks});
}

const createTask = async(req: NextApiRequest, res: NextApiResponse<DefaultMessageRespose | any>) => {
    if(!req.body){
        return res.status(400).json({error: 'Favor informar os dados para cadastro'});
    }

    const task = req.body as Task;

    if(!task.name || task.name.length < 2){
        return res.status(400).json({error: 'Nome não é válido.'});    
    }

    if(!task.userId || task.userId.length < 2){
        return res.status(400).json({error: 'UserId não é válido.'});    
    }

    if(!task.finishPrevisionDate || task.finishPrevisionDate.length < 8){
        return res.status(400).json({error: 'Data de previsão não é válida.'});    
    }
    
    await saveTask(task);
       
    return res.status(200).json({msg: 'Tarefa cadastrada com sucesso!'});
}

export default connectToDB(jwtValidator(endpoint));