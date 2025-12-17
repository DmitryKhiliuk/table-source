import React, {useEffect, useRef, useState} from "react";

const STORAGE_KEY = `table_column_widths_${typeof window !== 'undefined' ? window.location.pathname : ''}`;

const loadSaved = (): Record<string, number> => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            const parsed = JSON.parse(raw)
            if (parsed && typeof parsed === 'object') return parsed
        }
    } catch {
        // ignore
    }
    return {}
}

export const useResizeColumns = () => {

    const [columnWidths, setColumnWidths] = useState<Record<string, number>>(loadSaved)
    const resizingRef = useRef<null | { columnId: string, startX: number, startWidth: number }>(null)

    // Save widths when changed
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(columnWidths))
        } catch {
            // ignore
        }
    }, [columnWidths])

    // Handlers for resizing
    const onMouseDown = (e: React.MouseEvent, columnId: string) => {
        e.preventDefault()
        const th = (e.target as HTMLElement).closest('th') as HTMLElement | null
        const startWidth = th ? th.getBoundingClientRect().width : (columnWidths[columnId] ?? 100)
        resizingRef.current = {columnId, startX: e.clientX, startWidth}

        // attach listeners
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
        if (!resizingRef.current) return
        const {columnId, startX, startWidth} = resizingRef.current
        const delta = e.clientX - startX
        const newWidth = Math.max(10, Math.round(startWidth + delta)) // min width 40px
        setColumnWidths((prev) => ({...prev, [columnId]: newWidth}))
    }

    const onMouseUp = () => {
        if (!resizingRef.current) return
        resizingRef.current = null
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
    }

    return [columnWidths, onMouseDown] as const
};




