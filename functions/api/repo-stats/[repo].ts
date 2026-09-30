interface Env {
    GITHUB_TOKEN?: string;
}

interface EventContext {
    request: Request;
    env: Env;
    params: Record<string, string | string[]>;
}

interface RepoStatsResponse {
    stars: number;
    forks: number;
    version: string | null;
    releaseUrl: string | null;
    updatedAt: string | null;
}

export async function onRequestGet(context: EventContext): Promise<Response> {
    const repo = context.params.repo as string;
    if (!repo) {
        return Response.json({ error: 'Repository name is required' }, { status: 400 });
    }

    const owner = 'alikuxac';
    const token = context.env.GITHUB_TOKEN;

    const headers: Record<string, string> = {
        'User-Agent': 'CloudflarePagesFunction-ProfileCard/1.0',
        'Accept': 'application/vnd.github.v3+json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        // Fetch Repo Metadata (Stars, Forks, Pushed At)
        const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
        const repoRes = await fetch(repoUrl, { headers });

        if (!repoRes.ok) {
            if (repoRes.status === 404) {
                return Response.json({ error: 'Repository not found' }, { status: 404 });
            }
            return Response.json({ error: `GitHub API error: ${repoRes.statusText}` }, { status: repoRes.status });
        }

        const repoData: { stargazers_count?: number; forks_count?: number; pushed_at?: string } = await repoRes.json();

        let version: string | null = null;
        let releaseUrl: string | null = null;

        // Tier 1: Query Latest Release
        const releaseUrlApi = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
        const releaseRes = await fetch(releaseUrlApi, { headers });

        if (releaseRes.ok) {
            const releaseData: { tag_name?: string; html_url?: string } = await releaseRes.json();
            if (releaseData.tag_name) {
                version = releaseData.tag_name;
                releaseUrl = releaseData.html_url || `https://github.com/${owner}/${repo}/releases/tag/${releaseData.tag_name}`;
            }
        }

        // Tier 2: Fallback to Git Tags if Tier 1 failed
        if (!version) {
            const tagsUrlApi = `https://api.github.com/repos/${owner}/${repo}/tags`;
            const tagsRes = await fetch(tagsUrlApi, { headers });

            if (tagsRes.ok) {
                const tagsData: Array<{ name?: string }> = await tagsRes.json();
                if (Array.isArray(tagsData) && tagsData.length > 0 && tagsData[0].name) {
                    const tagName = tagsData[0].name;
                    version = tagName;
                    releaseUrl = `https://github.com/${owner}/${repo}/releases/tag/${tagName}`;
                }
            }
        }

        // Tier 3: If both fail, version and releaseUrl remain null.

        const payload: RepoStatsResponse = {
            stars: repoData.stargazers_count ?? 0,
            forks: repoData.forks_count ?? 0,
            version,
            releaseUrl,
            updatedAt: repoData.pushed_at ?? null,
        };

        return new Response(JSON.stringify(payload), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return Response.json({ error: message }, { status: 500 });
    }
}
