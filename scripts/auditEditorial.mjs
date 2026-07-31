import {buildEditorialCoverage} from './buildEditorialCoverage.mjs';

const result = await buildEditorialCoverage();
for (const error of result.errors) console.error(`ERROR: ${error}`);

const reviewed = result.entries.filter(({authoredStatus}) => authoredStatus === 'claim-reviewed');
const current = result.entries.filter(({effectiveStatus}) => effectiveStatus === 'claim-reviewed');
const stale = result.entries.filter(({effectiveStatus}) => effectiveStatus === 'review-out-of-date');
console.log(
  `Editorial audit: ${result.entries.length} canonical records; ${reviewed.length} authored claim-reviewed; `
  + `${current.length} current; ${stale.length} stale; ${result.errors.length} structural errors.`,
);
console.log(`${result.warnings.length} high-risk uncited-language signals were retained for human triage; they are not automatic errors.`);

if (result.errors.length) process.exitCode = 1;
