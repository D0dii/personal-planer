export interface Event {
  id: string;
  title: string;
  userId?: string;
  start: Date;
  end: Date;
  createdAt: Date;
  updatedAt: Date;
}
