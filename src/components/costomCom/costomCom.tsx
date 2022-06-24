import { Divider } from 'antd'

interface CostomComType {
    titles: string
}

const CostomCom: React.FC<CostomComType> = (props) => {
    return <div className='max_w'>
        <div className='bold'>
            {props.titles}
        </div>
        <Divider />
    </div>
}

export default CostomCom