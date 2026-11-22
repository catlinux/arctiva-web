const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Texto de las respuestas de la FAQ: solo `código` y [texto](enlace). Los enlaces
// absolutos se abren en pestaña nueva.
export function inline(s: string): string {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) =>
      u.startsWith('http') ? `<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>` : `<a href="${u}">${t}</a>`);
}

export const plain = (s: string) => s.replace(/`([^`]+)`/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
