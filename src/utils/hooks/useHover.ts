import { useEffect, useState } from "react";

export default function useHover(ref: React.RefObject<HTMLElement>): boolean {
    const [isHovering, setHovering] = useState<boolean>(false)

    const on = () => setHovering(true)
    const off = () => setHovering(false)

    useEffect(() => {
        if (!ref.current) {
            return
        }
        const node = ref.current

        node.addEventListener("mouseenter", on)
        node.addEventListener("mousemove", on)
        node.addEventListener("mouseleave", off)

        return function() {
            node.removeEventListener("mousemove", on)
            node.removeEventListener("mouseenter", on)
            node.removeEventListener("mouseleave", off)
        }
    }, [])

    return isHovering
}