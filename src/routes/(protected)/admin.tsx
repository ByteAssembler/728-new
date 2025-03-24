import { createFileRoute } from "@tanstack/react-router";

import { useState } from "react";

import "./admin.css";

import { Expand, Shrink } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Split from "react-split";

import ControllerWrapper from "~/lib/components/wrapper/admin/controller";
import LogTable from "~/lib/components/wrapper/admin/log-table";
import ReRender from "~/lib/components/wrapper/admin/re-render";
// import ConnectionStateWidget from "~/lib/components/wrapper/admin/~ConnectionState";
// import ControlWidget from "~/lib/components/wrapper/admin/~ControlState";
// import BatteryWidget from "~/lib/components/wrapper/admin/~BatteryWidget";

export const Route = createFileRoute("/(protected)/admin")({
  component: Admin,
  ssr: false,
});

const defaultCells = [
  [
    {
      id: "a",
      category: "a",
      title: "a",
      itemChildren: (
        <CONTENT>
          {/*
          <ConnectionStateWidget connectionState="online" />
          <ControlWidget />
          <BatteryWidget />
          */}
        </CONTENT>
      ),
      closeOnContentClick: true,
    },
    {
      id: "b",
      category: "b",
      title: "b",
      itemChildren: <CONTENT>b</CONTENT>,
      closeOnContentClick: true,
    },
    {
      id: "c",
      category: "c",
      title: "c",
      itemChildren: <ControllerWrapper />,
      closeOnContentClick: false,
    },
  ],
  [
    {
      id: "d",
      category: "d",
      title: "d",
      itemChildren: (
        <CONTENT>
          <div className="mt-10">
            <LogTable></LogTable>
          </div>
        </CONTENT>
      ),
      closeOnContentClick: true,
    },
    {
      id: "e",
      category: "e",
      title: "e",
      itemChildren: <CONTENT>e</CONTENT>,
      closeOnContentClick: true,
    },
  ],
];

interface CardProps {
  id: string;
  onSelect: (id: string) => void;
  isSelected?: boolean;
  children?: React.ReactNode;
}

interface ListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

interface ItemProps {
  id: string;
  onClose: () => void;
  closeOnContentClick?: boolean;
  children?: React.ReactNode;
}

export default function Admin() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  function _Outside({ id }: { id: string }) {
    const item = defaultCells.flat().find((it) => it.id === id);
    if (!item) return null;

    return (
      <CardOutside
        id={id}
        onClose={() => setSelectedId(null)}
        closeOnContentClick={item.closeOnContentClick}
      >
        {item.itemChildren}
      </CardOutside>
    );
  }

  return (
    <>
      <MainContent selectedId={selectedId} onSelect={setSelectedId} />
      <AnimatePresence>{selectedId && <_Outside id={selectedId} />}</AnimatePresence>
    </>
  );
}

function MainContent({ selectedId, onSelect }: ListProps) {
  return (
    <Split className="control-grid" direction="vertical" minSize={50}>
      <Split
        className="split-horizontal"
        sizes={[33.33, 33.33, 33.34]}
        minSize={100}
        gutterSize={10}
        snapOffset={0}
        dragInterval={1}
        direction="horizontal"
      >
        {defaultCells[0].map((cell, index) => (
          <Card
            key={index}
            onSelect={onSelect}
            isSelected={cell.id === selectedId}
            id={cell.id}
          >
            {cell.itemChildren}
          </Card>
        ))}
      </Split>
      <Split
        className="split-horizontal"
        sizes={[50, 50]}
        minSize={100}
        gutterSize={10}
        snapOffset={0}
        dragInterval={1}
        direction="horizontal"
      >
        {defaultCells[1].map((cell, index) => (
          <Card
            key={index}
            onSelect={onSelect}
            isSelected={cell.id === selectedId}
            id={cell.id}
          >
            {cell.itemChildren}
          </Card>
        ))}
      </Split>
    </Split>
  );
}

function Card({ children, id, onSelect }: CardProps) {
  return (
    <div className="card-content-container">
      <motion.div className="card-content" layoutId={`card-container-${id}`}>
        {children}
        <div className="grid-cell-button-fullscreen" onClick={() => onSelect(id)}>
          <Expand size={18} />
        </div>
      </motion.div>
    </div>
  );
}

function CardOutside({ children, id, closeOnContentClick, onClose }: ItemProps) {
  const item = defaultCells.flat().find((it) => it.id === id);
  if (!item) return null;

  return (
    <>
      <motion.div
        className="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <div
        className="card-content-container open"
        onClick={(e) => {
          if (closeOnContentClick && e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div className="card-content" layoutId={`card-container-${id}`}>
          <ReRender>{children}</ReRender>
          <div className="grid-cell-button-fullscreen" onClick={onClose}>
            <Shrink size={18} />
          </div>
        </motion.div>
      </div>
    </>
  );
}

function CONTENT({ title, children }: { title?: string; children?: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col p-2 w-full h-full">
        {title && (
          <div className="flex items-center mb-2 px-1 h-9 font-bold text-xl select-none">
            {title}
          </div>
        )}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
