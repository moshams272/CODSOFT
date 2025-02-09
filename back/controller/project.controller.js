import Project from "../models/project.model.js";
import User from "../models/user.model.js" 
import { httpStatusText } from "../utils/httpStatusText.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { appError } from "../utils/AppError.js";

const getProject = asyncWrapper(async (req, res, next) => {
  const project = await Project.findById(req.params._id);
  if (!project) {
    return next(appError.create("Projact not found", 400, httpStatusText.FAIL));
  }
  return res.json({
    status: httpStatusText.SUCCESS,
    data: { project: project },
  });
});

const updateProject = asyncWrapper(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params._id, {
    $set: { ...req.body },
  });
  if (!project) {
    return next(appError.create("Project not found", 400, httpStatusText.FAIL));
  }
  return res.json({ status: httpStatusText.SUCCESS, data: null });
});

const deleteProject = asyncWrapper(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params._id);
  await User.findByIdAndUpdate(req.currentUser._id,{$pull:{manage:req.params._id}});
  if (!project) {
    return next(appError.create("Project not found", 400, httpStatusText.FAIL));
  }
  return res.json({ status: httpStatusText.SUCCESS, data: null });
});

const createProject = asyncWrapper(async (req, res, next) => {
  const { title, description, deadline } = req.body;
  const newProject = new Project({
    title,
    description,
    manager: req.currentUser._id,
    deadline,
    status: "Pending",
  });
  await newProject.save();
  await User.findByIdAndUpdate(req.currentUser._id,{$push:{manage:newProject._id}});
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: newProject });
});

const getAllProject = asyncWrapper(async(req,res,next)=>{
    const user = await User.findById(req.currentUser._id).populate("manage");
    if (!user) {
        return next(appError.create("User not found", 400, httpStatusText.FAIL));
      }
      return res.json({
        status: httpStatusText.SUCCESS,
        data: { projects: user.manage },
      });
})

export {getProject,getAllProject,createProject,updateProject,deleteProject};