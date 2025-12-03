import express from 'express';
import { 
  getAllCourses, 
  createCourse, 
  getCourseById, 
  updateCourse,
  deleteCourse
} from '../controller/courseController.js';
import { protect, admin } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);

router.post('/', protect, admin, createCourse);
router.put('/:id', protect, admin, updateCourse); 
router.delete('/:id', protect, admin, deleteCourse);

export default router;