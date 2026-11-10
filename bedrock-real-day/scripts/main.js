import { system, world } from "@minecraft/server";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const MINECRAFT_TICKS_PER_DAY = 24000;
const REAL_DAWN_HOUR = 6;
const UPDATE_INTERVAL_TICKS = 20;

function getLocalMillisecondsSinceMidnight(date) {
  return (
    date.getHours() * 60 * 60 * 1000 +
    date.getMinutes() * 60 * 1000 +
    date.getSeconds() * 1000 +
    date.getMilliseconds()
  );
}

function getMinecraftTime() {
  const localTime = getLocalMillisecondsSinceMidnight(new Date());
  const dawnOffset = REAL_DAWN_HOUR * 60 * 60 * 1000;
  const millisecondsSinceMinecraftDawn =
    (localTime - dawnOffset + MILLISECONDS_PER_DAY) % MILLISECONDS_PER_DAY;

  return Math.floor(
    (millisecondsSinceMinecraftDawn / MILLISECONDS_PER_DAY) *
      MINECRAFT_TICKS_PER_DAY
  );
}

function initializeOverworldTime() {
  const overworld = world.getDimension("overworld");
  overworld.runCommand("gamerule doDaylightCycle false");
  overworld.setTimeOfDay(getMinecraftTime());
}

function updateOverworldTime() {
  world.getDimension("overworld").setTimeOfDay(getMinecraftTime());
}

initializeOverworldTime();
system.runInterval(updateOverworldTime, UPDATE_INTERVAL_TICKS);
