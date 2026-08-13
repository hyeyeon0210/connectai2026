module.exports = async function handler(req, res) {

  try {

    const { token, conversationId, text } = req.body;

    if (!token || !conversationId || !text) {
      return res.status(400).json({
        error: "필수값 누락"
      });
    }

    const activityUrl =
      `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`;

    // 사용자 메시지 전송
    const sendResponse = await fetch(activityUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        type: "message",
        from: {
          id: "student"
        },
        text: text
      })
    });

    const sendData = await sendResponse.json();

    // 응답 생성 대기
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 대화 조회
    const activityResponse = await fetch(activityUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const activityData = await activityResponse.json();

    console.log("ACTIVITY DATA");
    console.log(JSON.stringify(activityData, null, 2));

    if (
