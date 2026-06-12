import { CounterModel } from './counters.model.js';

export const getNextSequence = async (name) => {
  const counter = await CounterModel.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
};
