export const presaleData = {
  startCounterTime: new Date(2022, 6, 1, 0, 0, 0, 0),
  endCounterTime: new Date(2022, 7, 17, 0, 0, 0, 0),
};

export default async function handler(req, res) {
  return res.status(200).json(presaleData);
}
