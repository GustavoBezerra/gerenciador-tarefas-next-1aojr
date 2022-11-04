import internal from "stream"

export type Task = {
    id: string | undefined,
    userId: string,
    name: string,
    finishPrevisionDate: string, 
    finishDate: string
}