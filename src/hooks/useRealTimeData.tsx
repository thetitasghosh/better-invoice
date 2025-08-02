// hooks/useRealtimeData.ts
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function useRealtimeData(
  table: "invoices" | "customers",
  filterByTeamId?: string
) {
  const [data, setData] = useState<any[]>([]);
  const supabase = createClient();
  useEffect(() => {
    const fetchData = async () => {
      const { data: initialData, error } = await supabase
        .from(table)
        .select("*")
        .eq("team_id", filterByTeamId || "")
        .order("created_at", { ascending: false });

      if (!error) setData(initialData || []);
    };

    fetchData();

    const channel = supabase
      .channel(`realtime-${table}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table,
        },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, filterByTeamId]);

  return data;
}
