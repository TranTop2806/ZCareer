import express from 'express';
import { postJob, getAllJobs, getJobById, getAdminJobs, deleteJob, updateJob} from '../controllers/job.controller.js';
import isAuthenticated from './../middlewares/isAuthenticated.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = express.Router();

router.route("/post").post(isAuthenticated,checkRole(['recruiter']),postJob);
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(getJobById);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
router.route("/delete/:id").delete(isAuthenticated,deleteJob);
router.route("/update/:id").put(isAuthenticated,checkRole(['recruiter']),updateJob);
export default router;








