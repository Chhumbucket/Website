// Turns a Wordle share grid (rows of ⬛🟨🟩 emoji) into structured data for
// rendering. Kept separate from the component so the future "share once,
// auto-post" pipeline can reuse the same normalization on raw share text.

// Both the dark-mode (⬛) and light-mode (⬜) empty squares mean "absent".
const CELL_STATE = {
  '🟩': 'correct',
  '🟨': 'present',
  '⬛': 'absent',
  '⬜': 'absent',
}

export const cellState = (ch) => CELL_STATE[ch] ?? 'absent'

/**
 * Normalize one completion `{ number, date, grid: string[] }` into display
 * data. Each `grid` entry is a five-emoji row; spread (not split) so astral
 * emoji code points stay intact. Derives the X/6 score from the grid: a game
 * is solved when its last row is all-correct.
 */
export function summarize(entry) {
  const rows = entry.grid.map((row) => [...row].map(cellState))
  const solved =
    rows.length > 0 && rows[rows.length - 1].every((state) => state === 'correct')
  return {
    rows,
    solved,
    score: `${solved ? rows.length : 'X'}/6`,
  }
}
