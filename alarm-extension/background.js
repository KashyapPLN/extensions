console.log("in background.js");

function getRandomTime() {
  const now = new Date();
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  const end = new Date();
  end.setHours(16, 0, 0, 0);

  let randomTime = new Date(Math.random() * (end.getTime() - start.getTime()) + start.getTime());

  if (randomTime < now) {
    randomTime.setDate(randomTime.getDate() + 1);
  }

  return randomTime;
}

function getHelloMessage() {
  chrome.storage.local.get(["lastScheduledDate"], (data) => {
    const now = new Date();
    const today = now.toDateString();

    if (data.lastScheduledDate === today) {
      console.log("Notification already scheduled for today.");
      return;
    }

    const randomTime = getRandomTime();

    chrome.alarms.create("helloAlarm", { when: randomTime.getTime() });
    chrome.storage.local.set({ lastScheduledDate: today });
    console.log(`Scheduled notification for: ${randomTime}`);
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "helloAlarm") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "clock.png",
      title: "Hello",
      message: "Hello! Good afternoon. Have a great day!",
      priority: 2,
    });
    console.log("Hello notification displayed.");
  }
});

chrome.runtime.onInstalled.addListener(() => {
  getHelloMessage();
});

chrome.runtime.onStartup.addListener(() => {
  getHelloMessage();
});

  
  
  