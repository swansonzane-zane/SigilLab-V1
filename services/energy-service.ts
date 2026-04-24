"use client";

const energyStorageKey = "sigillab-energy-v1";
const dailyFreeLimit = 3;
const shareRewardLimit = 3;

export type EnergyState = {
  date: string;
  dailyFreeLimit: number;
  usedToday: number;
  shareRewardsToday: number;
  shareRewardLimit: number;
  sponsorRewardsToday: number;
  premium: boolean;
};

type StoredEnergyState = Omit<
  EnergyState,
  "dailyFreeLimit" | "shareRewardLimit" | "premium"
>;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDefaultStoredState(): StoredEnergyState {
  return {
    date: todayKey(),
    usedToday: 0,
    shareRewardsToday: 0,
    sponsorRewardsToday: 0,
  };
}

function readStoredState(): StoredEnergyState {
  if (typeof window === "undefined") {
    return getDefaultStoredState();
  }

  try {
    const rawValue = window.localStorage.getItem(energyStorageKey);

    if (!rawValue) {
      return getDefaultStoredState();
    }

    const parsed = JSON.parse(rawValue) as Partial<StoredEnergyState>;

    return {
      date: typeof parsed.date === "string" ? parsed.date : todayKey(),
      usedToday:
        typeof parsed.usedToday === "number" ? parsed.usedToday : 0,
      shareRewardsToday:
        typeof parsed.shareRewardsToday === "number"
          ? parsed.shareRewardsToday
          : 0,
      sponsorRewardsToday:
        typeof parsed.sponsorRewardsToday === "number"
          ? parsed.sponsorRewardsToday
          : 0,
    };
  } catch {
    return getDefaultStoredState();
  }
}

function writeStoredState(state: StoredEnergyState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(energyStorageKey, JSON.stringify(state));
}

export function resetIfNewDay() {
  const state = readStoredState();

  if (state.date !== todayKey()) {
    const nextState = getDefaultStoredState();
    writeStoredState(nextState);
    return nextState;
  }

  return state;
}

export function getEnergyState(premium = false): EnergyState {
  const state = resetIfNewDay();

  return {
    ...state,
    dailyFreeLimit,
    shareRewardLimit,
    premium,
  };
}

export function canGenerate(premium = false) {
  const state = getEnergyState(premium);

  if (state.premium) {
    return true;
  }

  return (
    state.usedToday <
    state.dailyFreeLimit + state.shareRewardsToday + state.sponsorRewardsToday
  );
}

export function consumeReading(premium = false) {
  const state = getEnergyState(premium);

  if (state.premium) {
    return state;
  }

  if (!canGenerate(false)) {
    return state;
  }

  const nextStoredState: StoredEnergyState = {
    date: state.date,
    usedToday: state.usedToday + 1,
    shareRewardsToday: state.shareRewardsToday,
    sponsorRewardsToday: state.sponsorRewardsToday,
  };

  writeStoredState(nextStoredState);
  return getEnergyState(false);
}

export function grantShareReward(premium = false) {
  const state = getEnergyState(premium);

  if (state.premium || state.shareRewardsToday >= state.shareRewardLimit) {
    return { granted: false, state };
  }

  const nextStoredState: StoredEnergyState = {
    date: state.date,
    usedToday: state.usedToday,
    shareRewardsToday: state.shareRewardsToday + 1,
    sponsorRewardsToday: state.sponsorRewardsToday,
  };

  writeStoredState(nextStoredState);
  return { granted: true, state: getEnergyState(false) };
}

export function grantAdReward(premium = false) {
  const state = getEnergyState(premium);

  if (state.premium) {
    return state;
  }

  const nextStoredState: StoredEnergyState = {
    date: state.date,
    usedToday: state.usedToday,
    shareRewardsToday: state.shareRewardsToday,
    sponsorRewardsToday: state.sponsorRewardsToday + 1,
  };

  writeStoredState(nextStoredState);
  return getEnergyState(false);
}
