module.exports = async function handler(req, res) {

  try {

    const { token, conversationId, text } = req.body;

    if (!token || !conversationId || !text) {
      return res.status(400).json({
        reply: "필수값이 없습니다."
      });
    }

    const activityUrl =
      `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`;

    // 사용자 메시지 전송
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

    // Copilot 응답 대기
    await new Promise(resolve =>
      setTimeout(resolve, 12000)
    );

    // 대화 조회
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

    console.error(error);

    return res.status(500).json({
      reply: error.message
    });

  }

};
