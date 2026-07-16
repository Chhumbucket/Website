import { profile } from '../data/profile'

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <h2>
        <span aria-hidden="true">## </span>Experience
      </h2>
      {/* role="list" restores list semantics that Safari/VoiceOver drops
          when list-style is none */}
      <ol className="experience__list" role="list">
        {profile.experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="job">
            <div className="job__header">
              <h3>
                {job.role} · {job.company}
              </h3>
              <span className="job__period">{job.period}</span>
            </div>
            {job.team && <p className="job__team">{job.team}</p>}
            <ul className="job__bullets">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
