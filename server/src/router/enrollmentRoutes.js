import express from 'express';
import { 
  enrollStudent, 
  getAllEnrollments, 
  getMyCourses, 
  updateProgress 
} from '../controller/enrollmentController.js';
import { admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', enrollStudent);              
router.get('/my-courses', getMyCourses);      
router.post('/progress', updateProgress);      

router.get('/', admin, getAllEnrollments); 

export default router;