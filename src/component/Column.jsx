import React from "react";
import Plus from "../assets/plus.svg";
import Minus from "../assets/minus.svg";
import { Draggable, Droppable } from "@hello-pangea/dnd";
function Column({ column, task }) {
  return (
    <div className="col-span-1">
      <div
        className="w-full border rounded-2xl h-full"
        style={{ backgroundColor: "#FBF7F0" }}
      >
        <div className="text-xl flex justify-between items-center px-6 py-2 border-b">
          <p className="font-jockey text-lg font-medium py-1">{column.title}</p>
        </div>
        <Droppable key={column.id} droppableId={column.id} index={column.id}>
          {(droppableProvided, droppableSnapshot) => (
            <div
              className="overflow-y-auto h-[150px] sm:h-[280px] px-4 py-2 space-y-2"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {task.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={`${item.id}`}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => {
                    return (
                      <div
                        className="bg-[#ecede8] flex justify-between items-center px-6 py-3 rounded-lg "
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <div className="flex space-x-4 items-center ">
                          <p style={{ fontFamily: "jura" }}>{item.content}</p>
                        </div>
                        <img src={Minus} alt="" />
                      </div>
                    );
                  }}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default Column;
