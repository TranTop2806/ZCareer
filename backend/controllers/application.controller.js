import { Application } from "../models/application.model.js";
import { Job } from "./../models/job.model.js";

// applicant routes
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    //check if user has already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this jobs.",
        success: false,
      });
    }
    //check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    //create a new application
    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });
    //add application to job
    job.applications.push(application._id);
    await job.save();

    return res.status(201).json({
      message: "Applied successfully.",
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// applicant routes
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applications) {
      return res.status(404).json({
        message: "No applications found.",
        success: false,
      });
    }
    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//admin routes
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      applicants: job.applications,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const {status} = req.body;
    const applicationId = req.params.id;
    const application = await Application.findOne({ _id: applicationId });
    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
        success: false,
      });
    }
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }
    //update status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Status updated successfully.",
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
