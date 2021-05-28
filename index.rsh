"reach 0.1"

const Player = {
	getHand: Fun([], UInt),
	seeOutcome: Fun([UInt], Null),
}
export const main = 
Reach.App(
  {}, 
  [
    Participant("Alice", Player), 
    Participant("Bob", Player)
  ], 
  (Alice, Bob) => {
    Alice.only(() => {
      const handA = declassify(interact.getHand())
    })
    Alice.publish(handA)
    commit()

    Bob.only(() => {
      const handB = declassify(interact.getHand())
    })
    Bob.publish(handB)

    const outcome = (handA + (4 - handB)) % 3;
    commit();

    each([Alice, Bob],  () => {
      interact.seeOutcome(outcome)
    })

    exit()
  });
