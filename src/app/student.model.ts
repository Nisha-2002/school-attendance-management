// import { Ingredient } from "../shared/ingredients.model";

export class Student{
    public sname:string;
    public sclass:string;
    public sroll:number;
    public teacher:string;
    public userId:string;
    // public imagePath:string;
    

    constructor(sname:string,sclass:string,sroll:number,teacher:string,userId:string){
        this.sname=sname;
        this.sclass=sclass;
        this.sroll=sroll;
        this.teacher=teacher;
        this.userId=userId;

    }
}