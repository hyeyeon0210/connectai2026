export default async function handler(req, res) {

  const secret = process.env.STUDENT_PARENT_SECRET;

  // 1. Direct Line 토큰 생성
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

  // 2. 실제 Conversation 생성
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

  res.status(200).json({
    token: tokenData.token,
    conversationId: conversationData.conversationId
  });

}
