import React, { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import activity from '@site/static/data/activity.json';
import styles from './styles.module.css';

/*
 * Commit activity heatmap for the Benefit Plan Standard repositories.
 *
 * Data comes from static/data/activity.json, written by
 * scripts/fetch-activity.js before every build and imported here at build
 * time. Dates are UTC. The grid ends at the day the data was generated,
 * which is the build day whenever the fetch succeeds.
 */

const WEEKS = 53;
const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 32; // room for the Mon/Wed/Fri labels
const TOP = 18; // room for the month labels
const WIDTH = LEFT + WEEKS * STEP - GAP;
const HEIGHT = TOP + 7 * STEP - GAP;
const DAY_MS = 24 * 60 * 60 * 1000;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_LABELS = { 1: 'Mon', 3: 'Wed', 5: 'Fri' };

const isoDay = (d) => d.toISOString().slice(0, 10);

function utcMidnight(iso) {
  const d = new Date(iso);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function cellTitle(date, count) {
  const when = `${WEEKDAYS[date.getUTCDay()]}, ${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  if (count === 0) return `No commits on ${when}`;
  return `${count} commit${count === 1 ? '' : 's'} on ${when}`;
}

function longDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS_LONG[m - 1]} ${d}, ${y}`;
}

// Quartiles of the non-zero days, so one unusually busy day does not wash
// out the rest of the year.
function levelFor(thresholds) {
  return (count) => {
    if (count <= 0) return 0;
    if (count <= thresholds[0]) return 1;
    if (count <= thresholds[1]) return 2;
    if (count <= thresholds[2]) return 3;
    return 4;
  };
}

function buildGrid(data) {
  const end = utcMidnight(data.generatedAt);
  // Sunday that starts the first of the 53 week columns.
  const start = new Date(end.getTime() - (52 * 7 + end.getUTCDay()) * DAY_MS);

  const nonZero = Object.values(data.days).filter((n) => n > 0).sort((a, b) => a - b);
  const q = (p) => (nonZero.length ? nonZero[Math.floor((nonZero.length - 1) * p)] : 0);
  const level = levelFor([q(0.25), q(0.5), q(0.75)]);

  const cells = [];
  const months = [];
  let prevMonth = null;

  for (let col = 0; col < WEEKS; col += 1) {
    const month = new Date(start.getTime() + col * 7 * DAY_MS).getUTCMonth();
    if (month !== prevMonth) {
      months.push({ col, label: MONTHS[month] });
      prevMonth = month;
    }

    for (let row = 0; row < 7; row += 1) {
      const date = new Date(start.getTime() + (col * 7 + row) * DAY_MS);
      if (date > end) break;
      const count = data.days[isoDay(date)] || 0;
      cells.push({ key: isoDay(date), col, row, count, level: level(count), title: cellTitle(date, count) });
    }
  }

  // The first column usually starts mid-month. Drop its label when the next
  // month begins too close to fit both.
  if (months.length > 1 && months[1].col - months[0].col < 3) months.shift();

  return { cells, months };
}

const { cells, months } = buildGrid(activity);
const total = new Intl.NumberFormat('en-US').format(activity.totalCommits);

export default function ActivityGraph() {
  const scrollerRef = useRef(null);

  // On narrow screens, start scrolled to the most recent weeks.
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  return (
    <div className={styles.activity}>
      <div
        ref={scrollerRef}
        className={styles.scroller}
        tabIndex={0}
        role="region"
        aria-label="Commit activity, last 12 months"
      >
        <svg
          className={styles.graph}
          width={WIDTH}
          height={HEIGHT}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={`${total} commits in the last 12 months`}
        >
          {months.map((m) => (
            <text key={`m${m.col}`} className={styles.label} x={LEFT + m.col * STEP} y={TOP - 7}>
              {m.label}
            </text>
          ))}
          {Object.entries(DAY_LABELS).map(([row, label]) => (
            <text
              key={label}
              className={styles.label}
              x={LEFT - 6}
              y={TOP + row * STEP + CELL / 2}
              dy="0.35em"
              textAnchor="end"
            >
              {label}
            </text>
          ))}
          {cells.map((c) => (
            <rect
              key={c.key}
              className={`${styles.cell} ${styles[`level${c.level}`]}`}
              x={LEFT + c.col * STEP}
              y={TOP + c.row * STEP}
              width={CELL}
              height={CELL}
              rx={2}
            >
              <title>{c.title}</title>
            </rect>
          ))}
        </svg>
      </div>

      <p className={styles.summary}>
        {total} commit{activity.totalCommits === 1 ? '' : 's'} across the Benefit Plan Standard
        repositories in the last 12 months.
        {activity.lastCommitDate && (
          <>
            {' '}Last change{' '}
            <Link to="/docs/changelog">{longDate(activity.lastCommitDate)}</Link>.
          </>
        )}
      </p>
    </div>
  );
}
