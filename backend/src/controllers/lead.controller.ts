import { Request, Response } from 'express';
import Lead from '../models/Lead';

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const lead = await Lead.create(req.body);

    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create lead',
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      search,
      status,
      source,
      page = 1,
      limit = 10,
    } = req.query;

    const query: any = {};

    // SEARCH FILTER

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },

        {
          email: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    // STATUS FILTER

    if (status) {
      query.status = status;
    }

    // SOURCE FILTER

    if (source) {
      query.source = source;
    }

    // FETCH FILTERED LEADS

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(
        (Number(page) - 1) * Number(limit)
      )
      .limit(Number(limit));

    // TOTAL COUNT

    const total = await Lead.countDocuments(
      query
    );

    res.json({
      data: leads,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(
        total / Number(limit)
      ),
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch leads',
    });
  }
};
export const getSingleLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found',
      });
    }

    res.json(lead);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching lead',
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(lead);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update lead',
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Lead deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete lead',
    });
  }
};