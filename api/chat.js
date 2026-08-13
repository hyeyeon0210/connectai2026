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

    const response = await fetch(
      activityUrl,
      {
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
      }
    );

    const data = await response.json();

    return res.status(200).json({
      success: true,
      activityId: data.id
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }

};
