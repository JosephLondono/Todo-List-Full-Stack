import React from "react";

const HeaderTask = ({ refreshTask }: { refreshTask: () => void }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-semibold">Lista de tareas</h1>
      <div className="flex gap-2 items-center justify-center mr-4">
        <button type="button" title="Agregar tarea">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </svg>
        </button>
        <button type="button" title="Refrescar tareas" onClick={refreshTask}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeaderTask;
