const input = document.getElementById('terminal-input');
const output = document.getElementById('output');

// Load dictionary entries from external JSON
let dictionary = {};

fetch('data/entries.json')
  .then(res => res.json())
  .then(data => dictionary = data)
  .catch(err => console.error("Error loading dictionary:", err));

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const query = input.value.trim().toLowerCase();
    input.value = '';
    handleQuery(query);
  }
});

function handleQuery(query) {
  const entry = dictionary[query];
  if (entry) {
    output.innerHTML += `\n> ${query.toUpperCase()}:\n${entry.desc}\n${entry.links?.map(l => `🔗 <a href="${l}" target="_blank">${l}</a>`).join('\n') || ''}\n`;
  } else {
    output.innerHTML += `\n> ${query} not found. Try another term.\n`;
  }
  output.scrollTop = output.scrollHeight;
}
