import express from 'express';
import {
  createLead,
  deleteLead,
  getLeads,
  getSingleLead,
  updateLead,
} from '../controllers/lead.controller';
import { protect } from '../middleware/auth.middleware';
import { adminOnly } from '../middleware/role.middleware';

const router = express.Router();

router.use(protect);

router.post('/', createLead);

router.route('/').get(getLeads).post(createLead);

router.delete('/:id', deleteLead);

router
  .route('/:id')
  .get(getSingleLead)
  .put(updateLead)
  .delete(adminOnly, deleteLead);

export default router;