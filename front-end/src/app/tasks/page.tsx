"use client";

import { Task } from "@/components/index/task-container/Task";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getTask } from "@/lib/taskManager/getTask";
import { TaskItemType } from "@/types/TaskItemType";
import { SessionProvider, useSessionContext } from "@/context/sessionContext";
import { Session } from "next-auth";

function TaskHome() {
  const { data: sessionData, status } = useSession();
  const { setSession } = useSessionContext();
  const [completeList, setCompleteList] = useState<TaskItemType[]>([]);
  const [inProgressList, setInProgressList] = useState<TaskItemType[]>([]);
  const [incompleteList, setIncompleteList] = useState<TaskItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && sessionData?.user?.email) {
      setSession(sessionData);
      async function fetchData() {
        const {
          complete = [],
          inProgress = [],
          incomplete = [],
        } = await getTask(sessionData as Session);
        setCompleteList(complete);
        setInProgressList(inProgress);
        setIncompleteList(incomplete);
        setLoading(false);
      }
      fetchData();
    }
  }, [status, sessionData, setSession]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center">
        <Loader />;
      </div>
    );
  }

  if (status === "unauthenticated") {
    window.location.href = "/auth";
    return null;
  }

  return (
    <div className="max-w-7xl flex flex-col w-full mx-auto flex-grow">
      <Task
        incompleteList={incompleteList}
        inProgressList={inProgressList}
        completeList={completeList}
      />
    </div>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <TaskHome />
    </SessionProvider>
  );
}
