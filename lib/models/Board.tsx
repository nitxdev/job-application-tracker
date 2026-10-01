import mongoose,{ Schema,Document } from "mongoose";

export interface IBoard extends Document{
name:string;
userid:string;
columns:mongoose.Types.ObjectId[];
createAt:Date;
updateAt:Date;

}
const BoardSchema=new Schema<IBoard>({
    name:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
        index:true,
    },
    columns:[
    {
  type:Schema.Types.ObjectId,
  ref:"Column",
    }
]
},{
  timeStaps:  true,
}
)