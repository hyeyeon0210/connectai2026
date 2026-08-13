for (let i = 0; i < 8; i++) {

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

    return res.status(200).json({
      reply:
        botMessages[botMessages.length - 1].text
    });

  }
}
