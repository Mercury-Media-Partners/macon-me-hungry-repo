// Central transition helper to determine if the site is in post-World Cup mode
export const isPostWorldCup = (): boolean => {
  // Target deadline: Monday, July 20, 2026 at 00:01:00 EST (UTC-4)
  // Which corresponds to 2026-07-20T04:01:00Z
  const deadline = new Date("2026-07-20T04:01:00Z").getTime();
  return Date.now() >= deadline;
};
