module.exports = async function handler(req, res) {

  try {

    const { token, conversationId, text } = req.body;

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

    // 응답 생성 대기
    await new Promise(resolve =>
      setTimeout(resolve, 5000)
    );

    // 응답 조회
    const response = await fetch(activityUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    console.log(
      JSON.stringify(data, null, 2)
    );

    return res.status(200).json({
      reply: JSON.stringify(data)
    });

  } catch (error) {

    return res.status(500).json({
      reply: error.message
    });

  }

};
