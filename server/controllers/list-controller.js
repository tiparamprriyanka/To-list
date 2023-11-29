import List from "../model/list.js";
import User from "../model/users.js";


// adding task
export const addTask = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id)
    if (existingUser) {
      const list = new List ({title, body, user: existingUser});
      await list.save()
      .then(()=> res.status(200).json({ list}));
      existingUser.list.push(list);
      existingUser.save()
    }
  } catch (error) {
    console.log(error)
  }
 
};
// updating task
export const upDateTask = async (req,res) => {
  try {
    const { title, body } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title,body });
    list.save().then(() => res.status(200).json({ message: "Tsk Updated"}));

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// delete task
export const deleteTask = async (req,res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(
      id ,
      { $pull: { list: req.params.id} }
    );
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id)
      .then(()=>{
        res.status(200).json({ message: "Task Deleted"})
      })
    }
  }catch (error) {
    console.log(error);
  }
};
// get task 
export const getTask = async (req, res) =>{
  const list = await List.find({ user: req.params.id })
  if (list.length !== 0){
    res.status(200).json({ list: list });
  }else {
    res.status(200).json({ message: "No Task" });
  }
};










