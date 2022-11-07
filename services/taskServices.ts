import type {NextApiRequest, NextApiResponse} from 'next';
import { TaskModel } from '../models/Task';
import { Task } from '../types/Task';

async function findAllTasksByUserId(userId: any) {
    console.log('Buscando tarefas do usuario:', userId);
    return await TaskModel.find({userId: userId});
}

async function findTaskById(taskId: any) {
    console.log('Buscando tarefa:', taskId);
    return await TaskModel.findById({_id: taskId});
}

async function saveTask(task: Task) {
    console.log('Salvando nova tarefa:', task);
    return await TaskModel.create(task);
}

export { findAllTasksByUserId, findTaskById, saveTask };