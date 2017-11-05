export class Task {
    _id: string;
    title: string;
    description: string;
    attachments: any[];
    status: string = 'todo';
    developed_by: string;
    priority: Number;
    owner: string;
    created_at: Date = new Date();
    updated_at: Date = new Date();


    constructor(data?: Task){
        if(data){
            this._id = data._id;
            this.title = data.title;
            this.description = data.description;
            this.attachments = data.attachments;
            this.priority = data.priority;
            this.developed_by = data.developed_by;
            this.owner = data.owner;
            this.status = (data.status)?data.status:'todo';
            this.created_at = (data.created_at)?data.created_at:new Date();
            this.updated_at = new Date();
        }
    }
}