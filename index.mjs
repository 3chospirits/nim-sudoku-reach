import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "./build/index.main.mjs";

(async () => {
  const stdlib = await loadStdlib();
  const startingBalance = stdlib.parseCurrency(100);

  const accAlice = await stdlib.newTestAccount(startingBalance);
  const accBob = await stdlib.newTestAccount(startingBalance);

  // displays currency amounts up to 4 decimals
  const fmt = (x) => stdlib.formatCurrency(x, 4);
  // gets balance of player and displays it
  const getBalance = async (who) => fmt(await stdlib.balanceOf(who));

  // get balances pre-game
  const beforeAlice = await getBalance(accAlice);
  const beforeBob = await getBalance(accBob);

  const ctcAlice = accAlice.deploy(backend);
  const ctcBob = accBob.attach(backend, ctcAlice.getInfo());

  const HAND = ["Rock", "Paper", "Scissors"];
  const OUTCOME = ["Bob wins", "Draw", "Alice wins"];

  const Player = (Who) => ({
    ...stdlib.hasRandom,
    getHand: () => {
      const hand = Math.floor(Math.random() * 3);
      console.log(`${Who} player ${HAND[hand]}`);
      return hand;
    },
    seeOutcome: (outcome) => {
      console.log(`${Who} saw outcome ${OUTCOME[outcome]}`);
    },
    informTimeout: () => {
      console.log(`${Who} observed a timeout`);
    }
  });

  await Promise.all([
    backend.Alice(ctcAlice, {
      ...Player("Alice"),
      wager: stdlib.parseCurrency(5),
    }),
    backend.Bob(ctcBob, {
      ...Player("Bob"),
      acceptWager: async (amt) => {
        await stdlib.wait(11)
        console.log(`Bob accepts the wager of ${fmt(amt)}.`);
      }
    }),
  ]);

  const afterAlice = await getBalance(accAlice);
  const afterBob = await getBalance(accBob);

  console.log(`Alice went from ${beforeAlice} to ${afterAlice}`);
  console.log(`Bob went from ${beforeBob} to ${afterBob}`);

  console.log("Hello, Alice and Bob!");
})();
