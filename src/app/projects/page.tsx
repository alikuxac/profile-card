import { getDb } from '@/db';
import { projects } from '@/db/schema';
import ProjectCard from '@/components/project-card';
import { desc } from 'drizzle-orm';

export const runtime = 'edge';

export default async function ProjectsPage() {
    let allProjects: any[] = [];
    try {
        const db = getDb(process.env as any);
        allProjects = await db.select().from(projects).orderBy(desc(projects.order));
    } catch (e) {
        console.error("Failed to fetch projects", e);
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Featured Projects</h1>
                <p style={{ color: 'var(--muted-foreground)', fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>A collection of things I&apos;ve built and worked on.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {allProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
