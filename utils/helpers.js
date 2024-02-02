function timeAgo(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return parseInt(secondsPast) + ' seconds ago';
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + ' minutes ago';
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + ' hours ago';
  }
  if (secondsPast <= 2592000) {
    return parseInt(secondsPast / 86400) + ' days ago';
  }
  if (secondsPast <= 31536000) {
    return parseInt(secondsPast / 2592000) + ' months ago';
  }
  return parseInt(secondsPast / 31536000) + ' years ago';
};


function sortByMostRecent(objects) {
  return objects.sort((a, b) => {
    // Convert createdAt strings to date objects
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    // Sort in descending order - most recent first
    return dateB - dateA;
  });
}

module.exports = { timeAgo, sortByMostRecent };
