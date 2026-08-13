export default async function handler(req, res) {

  try {

    const secret = process.env.STUDENT_PARENT_SECRET;

    const tokenResponse = await fetch(
      "https://directline.botframework.com/v3/directline/tokens/generate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secret}`
        }
      }
    );

    const tokenData = await tokenResponse.json();

    const conversationResponse = await fetch(
      "https://directline.botframework.com/v3/directline/conversations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.token}`
        }
      }
    );

    const conversationData =
      await conversationResponse.json();

    return res.status(200).json({
      token: tokenData.token,
      conversationId: conversationData.
