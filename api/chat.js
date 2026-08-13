module.exports = async function handler(req, res) {

  try {

    const { token, conversationId, text } = req.body;

    const activityUrl =
      `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`;

    await fetch(activityUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        type: "message",
        from: {
          id: "student"
        },
        text
      })
    });

    let lastReply = null;

for (let i = 0; i < 10; i++) {

  await new Promise(resolve =>
    setTimeout(resolve, 1000)
  );

  const response = await fetch(activityUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  const activities = data.activities || [];

  const botMessages = activities.filter(activity =>
    activity.type === "message" &&
    activity.from &&
    activity.from.id !== "student"
  );

  if (botMessages.length > 0) {

    lastReply =
      botMessages[botMessages.length - 1].text;

    break;
  }
}

return res.status(200).json({
  reply: lastReply || "응답을 받지 못했습니다."
});
``

    const response = await fetch(activityUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    const activities = data.activities || [];

    const botMessages = activities.filter(activity =>
      activity.type === "message" &&
      activity.from &&
      activity.from.id !== "student"
    );

    const lastMessage =
      botMessages.length > 0
        ? botMessages[botMessages.length - 1].text
        : "응답을 받지 못했습니다.";

    return res.status(200).json({
      reply: lastMessage
    });

  } catch (error) {

    return res.status(500).json({
      reply: error.message
    });

  }

};
