export default async function handler(req, res) {

  try {

    const { token, conversationId, text } = req.body;

    if (!token || !conversationId || !text) {
      return res.status(400).json({
        error: 'token, conversationId 또는 text가 없습니다.'
      });
    }

    const activityUrl =
      `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`;

    await fetch(activityUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        type: 'message',
        from: {
          id: 'student'
        },
        text
      })
    });

    await new Promise(resolve => setTimeout(resolve, 4000));

    const response = await fetch(activityUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));

    const activities = data.activities || [];

    const botMessages = activities.filter(activity =>
      activity.type === 'message' &&
      activity.from &&
      activity.from.id !== 'student'
    );

    const lastMessage =
      botMessages.length > 0
        ? botMessages[botMessages.length - 1].text
        : '응답을 받지 못했습니다.';

    return res.status(200).json({
      reply: lastMessage
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message,
      reply: '서버 오류가 발생했습니다.'
    });

  }

}export default async function handler(req, res) {

  try {

    const { token, conversationId, text } = req.body;

    if (!token || !conversationId || !text) {
      return res.status(400).json({
        error: 'token, conversationId 또는 text가 없습니다.'
      });
    }

    const activityUrl =
      `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`;

    await fetch(activityUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        type: 'message',
        from: {
          id: 'student'
        },
        text
      })
    });

    await new Promise(resolve => setTimeout(resolve, 4000));

    const response = await fetch(activityUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));

    const activities = data.activities || [];

    const botMessages = activities.filter(activity =>
      activity.type === 'message' &&
      activity.from &&
      activity.from.id !== 'student'
    );

    const lastMessage =
      botMessages.length > 0
        ? botMessages[botMessages.length - 1].text
        : '응답을 받지 못했습니다.';

    return res.status(200).json({
      reply: lastMessage
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message,
      reply: '서버 오류가 발생했습니다.'
    });

  }

}
