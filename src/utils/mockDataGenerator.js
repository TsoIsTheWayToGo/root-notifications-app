
const notificationTypes = [
  {
    type: "mention",
    templates: [
      { text: "tagged you in a conversation in", hasChannel: true },
      {
        text: "replied to your message in",
        hasChannel: true,
        hasMessage: true,
      },
      { text: "mentioned you in", hasChannel: true },
      { text: "referenced your comment in", hasChannel: true },
    ],
  },
  {
    type: "friend_request",
    templates: [
      { text: "sent you a friend request", status: "pending" },
      { text: "accepted your friend request", status: "accepted" },
      { text: "declined your friend request", status: "declined" },
    ],
  },
  {
    type: "community_invite",
    templates: [
      { text: "invited you to join" },
      { text: "sent you an invitation to" },
      { text: "wants you to join" },
    ],
  },
  {
    type: "achievement",
    templates: [
      { text: "New milestone: {achievement}" },
      { text: "Achievement unlocked: {achievement}" },
      { text: "You just earned: {achievement}" },
    ],
  },
];

const mockUsers = [
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Mason",
  "Isabella",
  "William",
  "Mia",
  "James",
  "Charlotte",
  "Benjamin",
  "Amelia",
  "Lucas",
  "Harper",
  "Henry",
  "Evelyn",
  "Alexander",
];

const mockChannels = [
  "general",
  "introductions",
  "feature-requests",
  "development",
  "design",
  "announcements",
  "help",
  "ideas",
  "feedback",
  "events",
  "off-topic",
  "resources",
  "bugs",
  "showcase",
  "questions",
];

const mockCommunities = [
  "Tech Hub",
  "Gaming Group",
  "Music Lovers",
  "Book Club",
  "Fitness Community",
  "Digital Nomads",
  "Photography Club",
  "Art Gallery",
  "Movie Buffs",
  "Travel Adventures",
  "Pet Lovers",
  "Green Living",
  "Career Growth",
  "DIY Makers",
];

const mockMessages = [
  "Could you help me with this?",
  "Great idea! Let's discuss this further",
  "Check out this awesome new feature!",
  "Thanks for your contribution",
  "Interesting perspective!",
  "I love how this turned out",
  "Can we schedule a meeting?",
  "Important update about the project",
  "Nice work on the latest release",
  "This is exactly what we needed",
];

const mockAchievements = [
  "100 Days Streak!",
  "Top Contributor of the Month",
  "Community Champion",
  "First Post Milestone",
  "Premium Member Status",
  "Verified Account",
  "Expert Status Achieved",
  "One Year Anniversary",
  "1000 Karma Points",
  "Super Supporter Badge",
];

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomTimeInPast(daysBack = 30) {
  const now = new Date();
  const past = new Date(
    now.getTime() - Math.random() * daysBack * 24 * 60 * 60 * 1000
  );
  return past.toISOString();
}
export function generateMockNotification(useRandomTime = false) {
  const notificationType = getRandomElement(notificationTypes);
  const template = getRandomElement(notificationType.templates);
  const sender = getRandomElement(mockUsers);
  const channel = getRandomElement(mockChannels);
  const mentionedUser = getRandomElement(mockUsers.filter((u) => u !== sender));
  const message = template.hasMessage ? getRandomElement(mockMessages) : null;
  const community = getRandomElement(mockCommunities);
  const achievement = getRandomElement(mockAchievements);

  const baseNotification = {
    id: generateId(),
    type: notificationType.type,
    sender,
    timestamp: useRandomTime ? getRandomTimeInPast() : new Date().toISOString(),
    read: useRandomTime ? Math.random() > 0.7 : false,
  };

  switch (notificationType.type) {
    case "mention":
      return {
        ...baseNotification,
        channel: template.hasChannel ? channel : null,
        message: template.hasMessage ? message : null,
        template: template.text,
        mentionedUser,
        formattedMessage: `@${mentionedUser} ${template.text}${
          template.hasChannel ? ` #${channel}` : ""
        }${template.hasMessage ? `: "${message}"` : ""}`,
      };

    case "friend_request":
      return {
        ...baseNotification,
        status: template.status || "pending",
      };

    case "community_invite":
      return {
        ...baseNotification,
        community,
        template: template.text,
      };

    case "achievement":
      return {
        ...baseNotification,
        message: template.text.replace("{achievement}", achievement),
      };

    default:
      return baseNotification;
  }
}

// Helper function to format notification text
export function formatNotificationText(notification) {
  switch (notification.type) {
    case "mention":
      return (
        notification.formattedMessage ||
        `@${notification.sender} ${notification.template}${
          notification.channel ? ` #${notification.channel}` : ""
        }${notification.message ? `: "${notification.message}"` : ""}`
      );

    case "friend_request":
      return `@${notification.sender} ${notification.template}`;

    case "community_invite":
      return `@${notification.sender} ${notification.template} ${notification.community}`;

    case "achievement":
      return notification.message;

    default:
      return notification.message;
  }
}

export function generateInitialNotifications(count = 50) {
  return Array.from({ length: count }, () =>
    generateMockNotification(true)
  ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}