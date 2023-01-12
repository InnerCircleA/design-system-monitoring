import { PropsWithChildren } from "react"
import { Button } from "ui-toolkit"

export const CustomButton: React.FC<PropsWithChildren> = ({
    children
}) => {
    return <Button style={{ background: "blue" }}>{children}</Button>
}
