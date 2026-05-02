#!/usr/bin/env node
/**
 * After enabling GitHub Discussions on the repo, run:
 *   GITHUB_TOKEN=ghp_xxx node scripts/fetch-giscus-ids.mjs
 *
 * Token needs `repo` scope. Prints data-repo-id and data-category-id to paste into giscus.ts
 */
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('Set GITHUB_TOKEN (classic PAT with repo scope, or fine-grained with Contents + Metadata read).');
  process.exit(1);
}

const query = `query {
  repository(owner: "Tenenberg", name: "tenenberg.github.io") {
    id
    hasDiscussionsEnabled
    discussionCategories(first: 25) {
      nodes { id name }
    }
  }
}`;

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
});

const body = await res.json();
if (body.errors?.length) {
  console.error(JSON.stringify(body.errors, null, 2));
  process.exit(1);
}

const repo = body.data?.repository;
if (!repo) {
  console.error('Repository not found.');
  process.exit(1);
}

console.log('hasDiscussionsEnabled:', repo.hasDiscussionsEnabled);
console.log('data-repo-id:', repo.id);
console.log('\nCategories:');
for (const c of repo.discussionCategories?.nodes ?? []) {
  console.log(`  ${c.name}: ${c.id}`);
}

const general = repo.discussionCategories?.nodes?.find(
  (c) => c.name.toLowerCase() === 'general',
);
if (general) {
  console.log('\n→ Paste into giscus.ts:');
  console.log(`  GISCUS_REPO_ID = '${repo.id}';`);
  console.log(`  GISCUS_CATEGORY = '${general.name}';`);
  console.log(`  GISCUS_CATEGORY_ID = '${general.id}';`);
}
