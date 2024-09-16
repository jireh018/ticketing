import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGrouName: string;
  abstract onMessage(data: T["data"], msg: Message): void;
  protected client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGrouName);
  }
  //setManualAckMode(true) --> explicitly acknowledge each message it processes.
  //setDeliverAllAvailable -->  ensure that a new subscriber receives all past messages that have been published to the channel
  //setDurableName --> allows a subscriber to resume receiving messages from where it left off if it disconnects and then reconnects.
  //queue-group-name --> queueu group persist events deliverable history

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGrouName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGrouName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
