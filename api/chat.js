export default async function handler(req, res) {

  const { token, conversationId, text } = req.body;

  await fetch(
    `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        type: 'message',
        from: { id: 'student' },
        text
      })
    }
  );

  await new Promise(r => setTimeout(r, 2000));

  const response = await fetch(
    `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  const botMessage =
    data.activities
      .filter(a => a.from?.id !== 'student')
      .pop();

  res.status(200).json({
    reply: botMessage?.text || '응답 없음'
  });

}
