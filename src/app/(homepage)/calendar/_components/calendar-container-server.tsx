import { User } from "next-auth";

export const CalendarContainerServer = ({ user }: { user: User }) => {
  return <div>{user.name}</div>;
};
