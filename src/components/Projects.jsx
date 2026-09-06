import { profile } from '../data/profile'

export default function Projects() {
  return (
    <section className="projects" id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Selected projects</h2>
      <ul className="projects__list" role="list">
        {profile.projects.map((project) => (
          <li className="project" key={project.name}>
            <h3>{project.name}</h3>
            {project.role && <p className="project__role">{project.role}</p>}
            <p className="project__description">{project.description}</p>
            <ul className="job__bullets">
              {project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
            <p className="project__stack">{project.stack}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
