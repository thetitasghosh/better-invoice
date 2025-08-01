"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getTeamIdByUserId, getUserTeamInfo } from "@/app/actions"; // <- You’ll define this next

type TeamContextType = {
  userId: string | null;
  teamId: string | null;
  teamMemberId: string | null;
  role: string | null;
  loading: boolean;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeamContext must be used within a TeamProvider");
  }
  return context;
};

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [teamMemberId, setTeamMemberId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getUserTeamInfo();
        const teamid = await getTeamIdByUserId(data?.userId ?? "");
        setUserId(data?.userId ?? null);
        setTeamId(data?.teamId || teamid);
        setTeamMemberId(data?.teamMemberId ?? null);
        setRole(data?.role ?? null);
      } catch (err) {
        console.error("Team context error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (process.env.NODE_ENV === "development") {
    console.log("TeamContext", { userId, teamId, teamMemberId, role });
  }

  return (
    <TeamContext.Provider
      value={{
        userId,
        teamId,
        teamMemberId,
        role,
        loading,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
