import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  //create instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  //save ticket to db
  await ticket.save();

  //fech ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //make 2 seperate changes to tickets fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 10 });

  //save first fetched ticket
  await firstInstance!.save();

  //save second fetched ticket and expect error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error("should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  //create instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  //save ticket to db
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
