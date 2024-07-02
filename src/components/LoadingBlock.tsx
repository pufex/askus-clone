import { CgSpinnerTwo as LoadingIcon } from "react-icons/cg";

type LoadingBlockProps = {
    height?: string,
}

const LoadingBlock = ({
    height = "200px"
}: LoadingBlockProps) => {
    return <div className="loading-block" style={{height}}>
        <LoadingIcon className="loading-icon" size={40}/>
    </div>
}

export default LoadingBlock
