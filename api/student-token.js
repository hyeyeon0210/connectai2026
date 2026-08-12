export default async function handler(req, res) {

  const secret =
    process.env.STUDENT_PARENT_SECRET;

  const response = await fetch(
    "https://directline.botframework.com/v3/directline/tokens/generate",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`
      }
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}
