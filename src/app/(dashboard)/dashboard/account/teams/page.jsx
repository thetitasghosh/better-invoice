import { getCurrentTeamForUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import React from "react";

const TeamPage = async () => {
  const team = await getCurrentTeamForUser();
  // console.log(team);

  if (!team) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl bg-background dark:bg-neutral-950">
        <h1 className="text-xl font-semibold mb-4">Your Team</h1>
        <p className="mb-4 text-neutral-500">
          You are not part of any team yet.
        </p>
        <Button disabled>Create New Team</Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl bg-background dark:bg-neutral-950">
      <h1 className="text-xl font-semibold mb-4">Your Team</h1>
      <div className="mb-4">
        <p>
          <strong>Name:</strong> {team.name}
        </p>
        {/* <p>
          <strong>Team ID:</strong> {team.id}
        </p> */}
        <p>
          <strong>Created at:</strong>{" "}
          {new Date(team.created_at).toLocaleString()}
        </p>
      </div>
      <Button disabled>Create New Team</Button>
    </div>
  );
};

export default TeamPage;
