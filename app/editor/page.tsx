'use client'
import Tiptap from "@/components/custom/tiptap/tiptap"
import NovelEditor from "@/components/custom/novel"

export default function EditorPage() {
  return <div className="flex flex-col gap-2">
    <Tiptap className="bg-secondary rounded-md m-3 p-2 min-h-40 border" />
    <NovelEditor className="bg-secondary rounded-md m-3 p-2 min-h-40 border" />
  </div>
}
