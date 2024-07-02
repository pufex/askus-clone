import { cn } from "../utils/cn"

type SkeletonProps = {
    children: React.ReactNode
    className?: string
}

export const SkeletonBody = ({
    children,
    className = ""
}: SkeletonProps) => {
    return <div 
        className={cn(
            "skeleton__body",
            className
        )}
    >
        {children}
    </div>
}

export const SkeletonCirlce = () => {
    return <div className="skeleton--circle skeleton__blinking"/>
}

export const SkeletonParagraph = ({
    children
}: SkeletonProps) => {
    return <div className="skeleton__paragraph">
        {children}
    </div>
}

export const SkeletonTextShort = () => {
    return <div className="skeleton__text skeleton__text--short skeleton__blinking"/>
}

export const SkeletonTextMid = () => {
    return <div className="skeleton__text skeleton__text--mid skeleton__blinking"/>
}

export const SkeletonTextLong = () => {
    return <div className="skeleton__text skeleton__text--long skeleton__blinking"/>
}

export const SkeletonButton = () => {
    return <div className="skeleton--button skeleton__blinking" />
}