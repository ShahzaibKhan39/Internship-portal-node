const internModel = require('../Model/Intern')
const createJob = async (req, res) => {
 const { titleName, jobDescription, requireMent, salery } = req.body;
 const createdJob = await internModel.create({ titleName:titleName, jobDescription:jobDescription,
 requireMent:requireMent,salery:salery }); 
 res.send(createdJob);
}
const getInternships = async (req,res)=>{
    const data =  await internModel.find({})
res.send(data)
}
const getsingleInternship = async(req,res)=>{
    const singleIntern = await internModel.findById(req.params.id)
    res.send(singleIntern)
}
const deleteSingleInternship = async(req,res)=>{
    const deleteIntern = await internModel.findByIdAndDelete(req.params.id)
    res.send(deleteIntern)
    console.log("Internship has been Deleted")

}
const  updateSingleInternship = async (req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const updateIntern = await internModel.findByIdAndUpdate(id,body,{new:true})
res.send("Internship has been updated")
}
module.exports = { createJob, getInternships,getsingleInternship,deleteSingleInternship, updateSingleInternship }
