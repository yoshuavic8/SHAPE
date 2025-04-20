"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"

interface QuestionnaireRankingProps {
  questionId: number
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
}

export function QuestionnaireRanking({
  questionId,
  options,
  value,
  onChange
}: QuestionnaireRankingProps) {
  // Initialize with provided value or default to options array
  const [items, setItems] = useState<string[]>(value && value.length > 0 ? value : [...options])

  useEffect(() => {
    // If value changes externally, update local state
    if (value && value.length > 0) {
      setItems(value)
    } else if (options && options.length > 0 && (!items || items.length === 0)) {
      setItems([...options])
    }
  }, [value, options])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const reordered = Array.from(items)
    const [removed] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, removed)

    setItems(reordered)
    onChange(reordered)
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const newItems = [...items]
    const temp = newItems[index]
    newItems[index] = newItems[index - 1]
    newItems[index - 1] = temp
    setItems(newItems)
    onChange(newItems)
  }

  const moveDown = (index: number) => {
    if (index === items.length - 1) return
    const newItems = [...items]
    const temp = newItems[index]
    newItems[index] = newItems[index + 1]
    newItems[index + 1] = temp
    setItems(newItems)
    onChange(newItems)
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground mb-2">
        Urutkan item berikut dari yang paling penting (atas) ke yang kurang penting (bawah).
        Gunakan tombol panah atau drag and drop untuk mengubah urutan.
      </p>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={`droppable-${questionId}`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {items.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{index + 1}.</span>
                        <span>{item}</span>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className="h-8 w-8"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => moveDown(index)}
                          disabled={index === items.length - 1}
                          className="h-8 w-8"
                        >
                          ↓
                        </Button>
                      </div>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
