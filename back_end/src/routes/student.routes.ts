import express from 'express';
import {
  requestCreateStudent,
  requestDeleteStudent,
  requestGetAllStudents,
  requestUpdateStudent,
} from '../controllers/student.controller';
import { validateStudent } from '../middleware/validateStudent';

const router = express.Router();

router.get('/', requestGetAllStudents);
router.post('/', validateStudent,requestCreateStudent);
router.put('/:id', validateStudent,requestUpdateStudent);
router.delete('/:id', requestDeleteStudent);

export default router;
