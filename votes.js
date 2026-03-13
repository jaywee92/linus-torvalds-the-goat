// votes.js — Quote voting system backed by localStorage
// Key: "linus-votes", Value: { [quoteId]: number }

const STORAGE_KEY = 'linus-votes';

export function loadVotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function saveVotes(votes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
}

export function upvote(quoteId) {
  const votes = loadVotes();
  votes[quoteId] = (votes[quoteId] || 0) + 1;
  saveVotes(votes);
  return votes[quoteId];
}

export function getCount(quoteId) {
  return loadVotes()[quoteId] || 0;
}

export function getSortedIds(ids) {
  const votes = loadVotes();
  return [...ids].sort((a, b) => (votes[b] || 0) - (votes[a] || 0));
}
