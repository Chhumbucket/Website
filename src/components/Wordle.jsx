import { profile } from '../data/profile'
import { summarize } from '../lib/wordle'

export default function Wordle() {
  const entries = profile.wordle ?? []

  return (
    <section className="wordle" id="wordle">
      <h2>
        <span aria-hidden="true">## </span>Wordle
      </h2>
      {entries.length === 0 ? (
        <p className="wordle__empty">No completions yet.</p>
      ) : (
        // Newest first. Copy before sorting so the source array is left alone.
        <ol className="wordle__list" role="list">
          {[...entries]
            .sort((a, b) => b.number - a.number)
            .map((entry) => {
              const { rows, solved, score } = summarize(entry)
              return (
                <li key={entry.number} className="wordle-card">
                  <div className="wordle-card__header">
                    <h3>Wordle {entry.number.toLocaleString()}</h3>
                    <span className="wordle-card__score">{score}</span>
                  </div>
                  {/* One labeled image rather than a pile of empty cells, so
                      screen readers announce the result, not 15 blank squares. */}
                  <div
                    className="wordle-grid"
                    role="img"
                    aria-label={`Wordle ${entry.number}, ${
                      solved ? `solved in ${rows.length} guesses` : 'not solved'
                    }`}
                  >
                    {rows.map((row, r) => (
                      <div className="wordle-grid__row" key={r}>
                        {row.map((state, c) => (
                          <span
                            key={c}
                            className={`wordle-cell wordle-cell--${state}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  {entry.date && (
                    <span className="wordle-card__date">{entry.date}</span>
                  )}
                </li>
              )
            })}
        </ol>
      )}
    </section>
  )
}
